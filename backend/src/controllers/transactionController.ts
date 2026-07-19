import { Request, Response } from 'express';
import { Transaction } from '../models/Transaction';
import { Enterprise } from '../models/Enterprise';

/**
 * POST /api/transactions
 * Accepts new income/expense logs from Micro-Enterprise Dashboard.
 */
export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const { enterpriseId, type, amount, category, description, timestamp } = req.body;

    // Validation
    if (!type || !amount || !category) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields: type, amount, and category are required.',
      });
      return;
    }

    // If enterpriseId is provided, verify enterprise exists
    let targetEnterpriseId = enterpriseId;
    if (!targetEnterpriseId) {
      // Default to first enterprise if not provided for convenience in hackathon demo
      const defaultEnt = await Enterprise.findOne();
      if (defaultEnt) {
        targetEnterpriseId = defaultEnt._id;
      }
    } else {
      const ent = await Enterprise.findById(targetEnterpriseId);
      if (!ent) {
        res.status(404).json({
          success: false,
          message: `Enterprise with ID ${targetEnterpriseId} not found`,
        });
        return;
      }
    }

    const transaction = new Transaction({
      enterpriseId: targetEnterpriseId,
      type,
      amount: Number(amount),
      category,
      description: description || '',
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction successfully created',
      data: savedTransaction,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message,
    });
  }
};
