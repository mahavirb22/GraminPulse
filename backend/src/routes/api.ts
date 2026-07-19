import { Router, Request, Response } from 'express';
import { getAllEnterprises, getEnterpriseById } from '../controllers/enterpriseController';
import { createTransaction } from '../controllers/transactionController';
import { getLiveTelemetry, triggerAnomaly } from '../controllers/telemetryController';
import { seedDatabase } from '../seed';

const router = Router();

// Enterprise routes
router.get('/enterprises', getAllEnterprises);
router.get('/enterprises/:id', getEnterpriseById);

// Transaction routes
router.post('/transactions', createTransaction);

// IoT Telemetry routes
router.get('/telemetry/live/:enterpriseId', getLiveTelemetry);
router.post('/telemetry/trigger-anomaly', triggerAnomaly);

// Seed route (Helper endpoint for hackathon demo initialization)
router.post('/seed', async (_req: Request, res: Response) => {
  try {
    const result = await seedDatabase();
    res.status(200).json({ success: true, ...result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Seeding failed', error: error.message });
  }
});

export default router;
