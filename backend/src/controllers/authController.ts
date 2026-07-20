import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Enterprise } from '../models/Enterprise';

/**
 * Helper to sanitize user object for client response (removes password hash)
 */
const sanitizeUser = (user: any) => {
  return {
    id: user._id,
    name: user.fullName,
    fullName: user.fullName,
    phone: user.phone,
    sector: user.sector,
    location: user.location,
    avatar: user.avatar,
    role: user.role,
    createdAt: user.createdAt,
  };
};

/**
 * POST /api/auth/signup
 * Registers a new micro-enterprise user / farmer in MongoDB with hashed password
 * and automatically initializes a fresh Enterprise record for them.
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, phone, password, sector, location } = req.body;

    if (!fullName || !phone || !password) {
      res.status(400).json({
        success: false,
        message: 'Full Name, Mobile Number, and Password are required.',
      });
      return;
    }

    const cleanPhone = phone.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'An account with this mobile number already exists. Please sign in.',
      });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in MongoDB
    const user = new User({
      fullName: fullName.trim(),
      phone: cleanPhone,
      password: hashedPassword,
      sector: sector || 'Dairy',
      location: location || 'Varanasi, UP',
    });

    const savedUser = await user.save();

    // Automatically initialize a fresh Enterprise record in MongoDB for the new user
    const enterprise = new Enterprise({
      userId: savedUser._id,
      name: `${savedUser.fullName}'s Enterprise`,
      sector: savedUser.sector,
      location: savedUser.location,
      overallRiskLevel: 'Stable',
      contactInfo: savedUser.phone,
    });
    const savedEnterprise = await enterprise.save();

    res.status(201).json({
      success: true,
      message: 'Account created successfully!',
      user: sanitizeUser(savedUser),
      enterprise: savedEnterprise,
      isNewUser: true,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to create user account.',
      error: error.message,
    });
  }
};

/**
 * POST /api/auth/login
 * Validates mobile number and password against MongoDB user collection and returns user details.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      res.status(400).json({
        success: false,
        message: 'Mobile number and Password are required.',
      });
      return;
    }

    const cleanPhone = phone.trim();

    // Find user by phone
    const user = await User.findOne({ phone: cleanPhone });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid mobile number or password. Please check credentials or sign up.',
      });
      return;
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid mobile number or password. Please check credentials.',
      });
      return;
    }

    // Fetch user's Enterprise if available
    const enterprise = await Enterprise.findOne({ userId: user._id }) || await Enterprise.findOne();

    res.status(200).json({
      success: true,
      message: 'Authentication successful!',
      user: sanitizeUser(user),
      enterprise,
      isNewUser: false,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Authentication failed due to a server error.',
      error: error.message,
    });
  }
};
