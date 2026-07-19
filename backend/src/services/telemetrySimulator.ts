import { Enterprise } from '../models/Enterprise';
import { IoTTelemetry } from '../models/IoTTelemetry';

/**
 * Helper to generate random float value between min and max rounded to specified decimals.
 */
const getRandomFloat = (min: number, max: number, decimals: number = 2): number => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

/**
 * Background IoT Telemetry Simulator.
 * Runs every 10 seconds to generate realistic normal telemetry data for all registered enterprises.
 */
export const generateTelemetryReadings = async (): Promise<void> => {
  try {
    const enterprises = await Enterprise.find();

    if (enterprises.length === 0) {
      return;
    }

    const newReadings = [];

    for (const ent of enterprises) {
      // Sector specific telemetry parameters
      // Dairy & Food Processing: Temp (2°C - 6°C), Vibration (0.01g - 0.05g)
      const tempVal = getRandomFloat(2.0, 6.0, 1);
      const vibVal = getRandomFloat(0.01, 0.05, 3);

      newReadings.push({
        enterpriseId: ent._id,
        metricName: 'Temperature',
        numericValue: tempVal,
        unit: '°C',
        status: 'Normal',
        timestamp: new Date(),
      });

      newReadings.push({
        enterpriseId: ent._id,
        metricName: 'Vibration',
        numericValue: vibVal,
        unit: 'g',
        status: 'Normal',
        timestamp: new Date(),
      });
    }

    await IoTTelemetry.insertMany(newReadings);
    console.log(`[IoT Simulator] Simulated ${newReadings.length} new sensor readings for ${enterprises.length} enterprises.`);
  } catch (error: any) {
    console.error('[IoT Simulator Error]:', error.message);
  }
};

let simulatorInterval: NodeJS.Timeout | null = null;

export const startTelemetrySimulator = (intervalMs: number = 10000): void => {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
  }

  console.log(`📡 [IoT Telemetry Simulator]: Started (Interval: ${intervalMs / 1000}s)`);

  // Run immediately once, then on schedule
  generateTelemetryReadings();

  simulatorInterval = setInterval(() => {
    generateTelemetryReadings();
  }, intervalMs);
};

export const stopTelemetrySimulator = (): void => {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
    simulatorInterval = null;
    console.log('🛑 [IoT Telemetry Simulator]: Stopped');
  }
};
