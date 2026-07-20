import { Schema, model, Document } from 'mongoose';
import { EnterpriseSector } from './Enterprise';

export interface IUser extends Document {
  fullName: string;
  phone: string;
  password: string; // Hashed password
  sector: EnterpriseSector;
  location: string;
  avatar: string;
  role: 'farmer' | 'field_officer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    sector: {
      type: String,
      enum: ['Dairy', 'Poultry', 'Food Processing', 'Retail', 'Agriculture', 'Artisan'],
      default: 'Dairy',
    },
    location: {
      type: String,
      default: 'Varanasi, UP',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    },
    role: {
      type: String,
      enum: ['farmer', 'field_officer', 'admin'],
      default: 'farmer',
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', UserSchema);
