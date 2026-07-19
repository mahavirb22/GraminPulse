import { Schema, model, Document } from 'mongoose';

export type EnterpriseSector = 'Dairy' | 'Poultry' | 'Food Processing' | 'Retail' | 'Agriculture' | 'Artisan';
export type RiskLevel = 'Stable' | 'Warning' | 'Action Required' | 'Elevated Risk';

export interface IEnterprise extends Document {
  name: string;
  sector: EnterpriseSector;
  location: string;
  overallRiskLevel: RiskLevel;
  contactInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnterpriseSchema = new Schema<IEnterprise>(
  {
    name: {
      type: String,
      required: [true, 'Enterprise name is required'],
      trim: true,
    },
    sector: {
      type: String,
      required: [true, 'Sector is required'],
      enum: ['Dairy', 'Poultry', 'Food Processing', 'Retail', 'Agriculture', 'Artisan'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    overallRiskLevel: {
      type: String,
      enum: ['Stable', 'Warning', 'Action Required', 'Elevated Risk'],
      default: 'Stable',
    },
    contactInfo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Enterprise = model<IEnterprise>('Enterprise', EnterpriseSchema);
