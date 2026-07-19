import { Request, Response } from 'express';
import { getAdvisoryForEnterprise } from '../services/advisoryEngine';

/**
 * GET /api/analytics/advisory/:enterpriseId
 * Wrapper endpoint executing the XAI Cash Flow Predictor and RAG Advisory Pipeline.
 */
export const getEnterpriseAdvisory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { enterpriseId } = req.params;

    if (!enterpriseId) {
      res.status(400).json({
        success: false,
        message: 'Enterprise ID is required.',
      });
      return;
    }

    const advisory = await getAdvisoryForEnterprise(enterpriseId);

    res.status(200).json({
      success: true,
      data: advisory,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: `Failed to generate AI advisory for enterprise ${req.params.enterpriseId}`,
      error: error.message,
    });
  }
};
