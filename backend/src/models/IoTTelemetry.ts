import { Schema, model, Document, Types } from 'mongoose';

export type TelemetryStatus = 'Normal' | 'Alert';

export interface IIoTTelemetry extends Document {
  enterpriseId: Types.ObjectId;
  metricName: string; // Temperature, Vibration, Humidity, etc.
  numericValue: number;
  unit?: string;
  status: TelemetryStatus;
  timestamp: Date;
}

const IoTTelemetrySchema = new Schema<IIoTTelemetry>(
  {
    enterpriseId: {
      type: Schema.Types.ObjectId,
      ref: 'Enterprise',
      required: [true, 'Enterprise ID is required'],
      index: true,
    },
    metricName: {
      type: String,
      required: [true, 'Metric name is required'],
      trim: true,
    },
    numericValue: {
      type: Number,
      required: [true, 'Numeric value is required'],
    },
    unit: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Normal', 'Alert'],
      default: 'Normal',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const IoTTelemetry = model<IIoTTelemetry>('IoTTelemetry', IoTTelemetrySchema);
