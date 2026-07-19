import { Request, Response } from 'express';
import { Enterprise } from '../models/Enterprise';
import { Transaction } from '../models/Transaction';
import { IoTTelemetry } from '../models/IoTTelemetry';

/**
 * GET /api/enterprises
 * Returns all micro-enterprises with current risk status for Field Officer Hub.
 * Supports optional query filters: ?sector=Dairy&search=Ganga
 */
export const getAllEnterprises = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sector, search } = req.query;
    const filter: Record<string, any> = {};

    if (sector && typeof sector === 'string' && sector !== 'All') {
      filter.sector = sector;
    }

    if (search && typeof search === 'string') {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const enterprises = await Enterprise.find(filter).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: enterprises.length,
      data: enterprises,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enterprises',
      error: error.message,
    });
  }
};

/**
 * GET /api/enterprises/:id
 * Returns single enterprise populated with latest transactions & IoT telemetry for Risk Profile.
 */
export const getEnterpriseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const enterprise = await Enterprise.findById(id);

    if (!enterprise) {
      res.status(404).json({
        success: false,
        message: `Enterprise with ID ${id} not found`,
      });
      return;
    }

    // Fetch latest transactions for this enterprise
    const transactions = await Transaction.find({ enterpriseId: id })
      .sort({ timestamp: -1 })
      .limit(10);

    // Fetch latest IoT telemetry logs for this enterprise
    const telemetry = await IoTTelemetry.find({ enterpriseId: id })
      .sort({ timestamp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        enterprise,
        recentTransactions: transactions,
        telemetryLogs: telemetry,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Error retrieving enterprise with ID ${req.params.id}`,
      error: error.message,
    });
  }
};
