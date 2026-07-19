import { Schema, model, Document, Types } from 'mongoose';

export type TransactionType = 'Income' | 'Expense';

export interface ITransaction extends Document {
  enterpriseId: Types.ObjectId;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  timestamp: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    enterpriseId: {
      type: Schema.Types.ObjectId,
      ref: 'Enterprise',
      required: [true, 'Enterprise ID is required'],
      index: true,
    },
    type: {
      type: String,
      enum: ['Income', 'Expense'],
      required: [true, 'Transaction type is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
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

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);
