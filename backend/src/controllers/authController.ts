import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Enterprise, EnterpriseSector } from '../models/Enterprise';

// Regex patterns for validation
const PHONE_REGEX = /^[6-9]\d{9}$/;
const NAME_REGEX = /^[a-zA-Z\s\-']{2,50}$/;
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[A-Za-z])(?=.*\d)/;
const VALID_SECTORS: EnterpriseSector[] = ['Dairy', 'Poultry', 'Food Processing', 'Retail', 'Agriculture', 'Artisan'];

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
 * Registers a new micro-enterprise user / farmer in MongoDB with strict validations.
 */
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    let { fullName, phone, password, sector, location } = req.body;

    // Type checking and basic presence check
    if (typeof fullName !== 'string' || typeof phone !== 'string' || typeof password !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid request payload. All fields must be strings.',
      });
      return;
    }

    fullName = fullName.trim();
    phone = phone.replace(/\D/g, ''); // Strip non-digit characters
    password = password.trim();
    location = typeof location === 'string' ? location.trim() : 'Varanasi, UP';

    // 1. Validate Full Name
    if (!fullName || !NAME_REGEX.test(fullName)) {
      res.status(400).json({
        success: false,
        message: 'Full Name must be between 2 and 50 characters and contain only letters and spaces.',
      });
      return;
    }

    // 2. Validate Indian Mobile Number (10 digits starting with 6, 7, 8, or 9)
    if (!phone || !PHONE_REGEX.test(phone)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).',
      });
      return;
    }

    // 3. Validate Password Complexity
    if (password.length < 6 || password.length > 128) {
      res.status(400).json({
        success: false,
        message: 'Password must be between 6 and 128 characters long.',
      });
      return;
    }

    if (!PASSWORD_COMPLEXITY_REGEX.test(password)) {
      res.status(400).json({
        success: false,
        message: 'Password must contain at least one letter and at least one number for security.',
      });
      return;
    }

    // 4. Validate Sector Enum
    const validSector: EnterpriseSector = VALID_SECTORS.includes(sector as EnterpriseSector)
      ? (sector as EnterpriseSector)
      : 'Dairy';

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'An account with this mobile number already exists. Please sign in.',
      });
      return;
    }

    // Hash password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user in MongoDB
    const user = new User({
      fullName,
      phone,
      password: hashedPassword,
      sector: validSector,
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
      message: 'Failed to create user account due to a server error.',
      error: error.message,
    });
  }
};

/**
 * POST /api/auth/login
 * Validates mobile number and password against MongoDB user collection with sanitization.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    let { phone, password } = req.body;

    if (typeof phone !== 'string' || typeof password !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Mobile number and Password are required.',
      });
      return;
    }

    phone = phone.replace(/\D/g, '');
    password = password.trim();

    // Validate phone pattern
    if (!phone || !PHONE_REGEX.test(phone)) {
      res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number.',
      });
      return;
    }

    if (!password) {
      res.status(400).json({
        success: false,
        message: 'Password is required.',
      });
      return;
    }

    // Find user by phone
    const user = await User.findOne({ phone });
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
