import { Request, Response } from 'express';
import { IoTTelemetry } from '../models/IoTTelemetry';
import { Enterprise } from '../models/Enterprise';

/**
 * GET /api/telemetry/live/:enterpriseId
 * Returns 5 most recent telemetry documents sorted by timestamp descending for real-time UI polling.
 */
export const getLiveTelemetry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { enterpriseId } = req.params;

    if (!enterpriseId) {
      res.status(400).json({
        success: false,
        message: 'Enterprise ID is required.',
      });
      return;
    }

    const telemetry = await IoTTelemetry.find({ enterpriseId })
      .sort({ timestamp: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      count: telemetry.length,
      data: telemetry,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch live telemetry for enterprise ${req.params.enterpriseId}`,
      error: error.message,
    });
  }
};

/**
 * POST /api/telemetry/trigger-anomaly
 * Immediately injects critical failure metrics (e.g. Temp: 15°C, Vibration: 0.9g, status: Alert)
 * into database for live hackathon demonstration.
 */
export const triggerAnomaly = async (req: Request, res: Response): Promise<void> => {
  try {
    let { enterpriseId } = req.body;

    // Fallback to first enterprise if enterpriseId is not supplied in request body
    let enterprise = null;
    if (enterpriseId) {
      enterprise = await Enterprise.findById(enterpriseId);
    }

    if (!enterprise) {
      enterprise = await Enterprise.findOne({ overallRiskLevel: { $in: ['Elevated Risk', 'Action Required', 'Warning'] } }) || await Enterprise.findOne();
      if (enterprise) {
        enterpriseId = enterprise._id;
      }
    }

    if (!enterpriseId) {
      res.status(404).json({
        success: false,
        message: 'No enterprise found to trigger anomaly.',
      });
      return;
    }

    const anomalyTime = new Date();

    // Create Critical Failure Telemetry Records
    const anomalyLogs = await IoTTelemetry.insertMany([
      {
        enterpriseId,
        metricName: 'Temperature',
        numericValue: 15.0,
        unit: '°C',
        status: 'Alert',
        timestamp: anomalyTime,
      },
      {
        enterpriseId,
        metricName: 'Vibration',
        numericValue: 0.9,
        unit: 'g',
        status: 'Alert',
        timestamp: anomalyTime,
      },
    ]);

    // Update enterprise overall risk level to Elevated Risk
    await Enterprise.findByIdAndUpdate(enterpriseId, {
      overallRiskLevel: 'Elevated Risk',
    });

    res.status(201).json({
      success: true,
      message: `Critical telemetry anomaly triggered successfully for ${enterprise?.name || enterpriseId}`,
      data: {
        enterpriseId,
        enterpriseName: enterprise?.name,
        injectedMetrics: anomalyLogs,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to trigger telemetry anomaly',
      error: error.message,
    });
  }
};
