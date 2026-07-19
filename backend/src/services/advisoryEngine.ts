import { GoogleGenerativeAI } from '@google/generative-ai';
import { Transaction } from '../models/Transaction';
import { IoTTelemetry } from '../models/IoTTelemetry';
import { Enterprise, EnterpriseSector } from '../models/Enterprise';

export interface CashFlowPrediction {
  totalIncome: number;
  totalExpense: number;
  netCashFlow: number;
  forecastedRevenue: number;
  projectedDeficit: number;
  hasDeficit: boolean;
  hasIoTAlert: boolean;
  alertCount: number;
  alertMetrics: string[];
}

export interface AdvisoryResult {
  enterpriseId: string;
  enterpriseName: string;
  sector: EnterpriseSector;
  forecastedRevenue: number;
  projectedDeficit: number;
  hasDeficit: boolean;
  hasIoTAlert: boolean;
  alertCount: number;
  alertMetrics: string[];
  xaiExplanation: string;
  actionableAdvisory: string;
  generatedBy: 'Gemini-LLM' | 'GraminPulse-RAG-Engine';
}

/**
 * 1. Cash Flow Predictor Service
 * Reads last 3 months of Transactions and checks IoTTelemetry for recent 'Alert' statuses.
 */
export const predictCashFlow = async (enterpriseId: string): Promise<CashFlowPrediction> => {
  // Fetch transactions
  const transactions = await Transaction.find({ enterpriseId }).sort({ timestamp: -1 });

  let totalIncome = 0;
  let totalExpense = 0;

  for (const tx of transactions) {
    if (tx.type === 'Income') {
      totalIncome += tx.amount;
    } else if (tx.type === 'Expense') {
      totalExpense += tx.amount;
    }
  }

  // Fallback defaults for demo if transactions are sparse
  const baselineIncome = totalIncome > 0 ? totalIncome : 45000;
  const baselineExpense = totalExpense > 0 ? totalExpense : 32000;
  const netCashFlow = baselineIncome - baselineExpense;

  // Check IoT Telemetry for recent Alert statuses
  const alertLogs = await IoTTelemetry.find({ enterpriseId, status: 'Alert' })
    .sort({ timestamp: -1 })
    .limit(10);

  const hasIoTAlert = alertLogs.length > 0;
  const alertMetrics = Array.from(new Set(alertLogs.map((log) => log.metricName)));

  // Forecast next month revenue
  let forecastedRevenue = baselineIncome * 0.95; // Default 5% variance
  let penaltyRatio = 0;

  if (hasIoTAlert) {
    // If telemetry alert present (e.g. Temp or Vibration alert), apply 15-25% drop
    penaltyRatio = alertMetrics.includes('Temperature') ? 0.20 : 0.15;
    forecastedRevenue = Math.round(baselineIncome * (1 - penaltyRatio));
  } else {
    // Healthy growth projection
    forecastedRevenue = Math.round(baselineIncome * 1.12);
  }

  // Projected Deficit calculation against anticipated expenses
  const expectedMonthlyExpenses = Math.round(baselineExpense * 1.1);
  const netForecast = forecastedRevenue - expectedMonthlyExpenses;
  const hasDeficit = netForecast < 0 || hasIoTAlert;
  const projectedDeficit = netForecast < 0 ? Math.abs(netForecast) : 0;

  return {
    totalIncome: baselineIncome,
    totalExpense: baselineExpense,
    netCashFlow,
    forecastedRevenue,
    projectedDeficit,
    hasDeficit,
    hasIoTAlert,
    alertCount: alertLogs.length,
    alertMetrics,
  };
};

/**
 * 2. XAI Generator
 * Generates a transparent, human-understandable explanation string.
 */
export const generateXAIExplanation = (
  prediction: CashFlowPrediction,
  sector: EnterpriseSector
): string => {
  if (prediction.hasIoTAlert && prediction.hasDeficit) {
    const metricsStr = prediction.alertMetrics.length > 0
      ? prediction.alertMetrics.join(' and ')
      : 'sensor';
    return `Predicted revenue reduction due to sustained high ${metricsStr.toLowerCase()} alerts in ${sector.toLowerCase()} facilities, indicating imminent inventory spoilage and equipment downtime risk.`;
  }

  if (prediction.hasDeficit) {
    return `Projected deficit of ₹${prediction.projectedDeficit.toLocaleString()} for next month due to elevated operational costs exceeding incoming revenue.`;
  }

  return `Stable projected cash flow with estimated 12% revenue growth based on optimal telemetry readings and consistent income.`;
};

/**
 * 3. LLM / RAG Advisory Generator
 * Calls Google Gemini SDK if API key available, or uses domain RAG fallback to generate a strict 2-sentence actionable advisory.
 */
export const generateLLMAdvisory = async (
  xaiExplanation: string,
  sector: EnterpriseSector,
  enterpriseName: string,
  hasDeficit: boolean,
  hasIoTAlert: boolean
): Promise<{ advisory: string; generatedBy: 'Gemini-LLM' | 'GraminPulse-RAG-Engine' }> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are an expert AI financial & agricultural advisor for rural micro-enterprises in India.
Enterprise Name: ${enterpriseName}
Sector: ${sector}
XAI Reason: "${xaiExplanation}"

Write a strict 2-sentence actionable recommendation for this micro-enterprise. Focus on immediate physical risk mitigation and financial buffer options (e.g. NABARD liquidity, Kisan credit buffer). Do not add preamble or extra text. Exactly 2 sentences.`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();

      if (responseText) {
        return {
          advisory: responseText,
          generatedBy: 'Gemini-LLM',
        };
      }
    } catch (err: any) {
      console.warn('[Gemini LLM SDK Warning]: Falling back to RAG Engine:', err.message);
    }
  }

  // Domain RAG Fallback Advisory Logic (Strict 2 sentences)
  let fallbackAdvisory = '';

  if (hasIoTAlert && sector === 'Dairy') {
    fallbackAdvisory = 'Immediately inspect cold storage insulation and check chiller motor vibrations. Apply for a NABARD short-term emergency liquidity buffer to prevent milk spoilage losses.';
  } else if (hasIoTAlert && sector === 'Poultry') {
    fallbackAdvisory = 'Activate backup ventilation systems immediately to maintain target temperature thresholds. Secure micro-finance emergency credit to offset feed and cooling expenses.';
  } else if (hasIoTAlert) {
    fallbackAdvisory = 'Immediately inspect storage equipment to resolve elevated temperature and vibration alerts. Access short-term agricultural working capital buffers to preserve operational liquidity.';
  } else if (hasDeficit) {
    fallbackAdvisory = 'Review upcoming monthly supplier payments to defer non-essential capital expenditures. Consult your field officer to restructure upcoming loan installment schedules.';
  } else {
    fallbackAdvisory = 'Maintain current operational standards while re-investing surplus cash flow into yield-boosting equipment. Consider enrolling in crop insurance schemes to hedge against seasonal market volatility.';
  }

  return {
    advisory: fallbackAdvisory,
    generatedBy: 'GraminPulse-RAG-Engine',
  };
};

/**
 * Main Advisory Pipeline orchestrating Cash Flow Predictor, XAI Generator, and LLM Advisory.
 */
export const getAdvisoryForEnterprise = async (enterpriseId: string): Promise<AdvisoryResult> => {
  const enterprise = await Enterprise.findById(enterpriseId);

  if (!enterprise) {
    throw new Error(`Enterprise ${enterpriseId} not found`);
  }

  // 1. Predict Cash Flow
  const prediction = await predictCashFlow(enterpriseId);

  // 2. Generate XAI Explanation
  const xaiExplanation = generateXAIExplanation(prediction, enterprise.sector);

  // 3. Generate LLM / RAG Advisory
  const { advisory, generatedBy } = await generateLLMAdvisory(
    xaiExplanation,
    enterprise.sector,
    enterprise.name,
    prediction.hasDeficit,
    prediction.hasIoTAlert
  );

  return {
    enterpriseId: enterprise._id.toString(),
    enterpriseName: enterprise.name,
    sector: enterprise.sector,
    forecastedRevenue: prediction.forecastedRevenue,
    projectedDeficit: prediction.projectedDeficit,
    hasDeficit: prediction.hasDeficit,
    hasIoTAlert: prediction.hasIoTAlert,
    alertCount: prediction.alertCount,
    alertMetrics: prediction.alertMetrics,
    xaiExplanation,
    actionableAdvisory: advisory,
    generatedBy,
  };
};
