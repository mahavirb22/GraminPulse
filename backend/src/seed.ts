import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Enterprise } from './models/Enterprise';
import { Transaction } from './models/Transaction';
import { IoTTelemetry } from './models/IoTTelemetry';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/graminpulse';

export const seedDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB for database seeding.');
    }

    // Clear existing collections
    await Enterprise.deleteMany({});
    await Transaction.deleteMany({});
    await IoTTelemetry.deleteMany({});

    console.log('Cleared existing database records.');

    // Create Enterprises
    const enterprises = await Enterprise.create([
      {
        name: 'Ganga Dairy Coop',
        sector: 'Dairy',
        location: 'Varanasi, UP',
        overallRiskLevel: 'Stable',
        contactInfo: '+91 98765 43210',
      },
      {
        name: 'Kisan Organics',
        sector: 'Agriculture',
        location: 'Nashik, Maharashtra',
        overallRiskLevel: 'Warning',
        contactInfo: '+91 98123 45678',
      },
      {
        name: 'Sunrise Poultry',
        sector: 'Poultry',
        location: 'Namakkal, Tamil Nadu',
        overallRiskLevel: 'Action Required',
        contactInfo: '+91 94432 10987',
      },
      {
        name: 'Kisan Agro Co.',
        sector: 'Food Processing',
        location: 'Indore, MP',
        overallRiskLevel: 'Elevated Risk',
        contactInfo: '+91 97555 12345',
      },
      {
        name: 'Crafts of Bundelkhand',
        sector: 'Retail',
        location: 'Jhansi, UP',
        overallRiskLevel: 'Stable',
        contactInfo: '+91 96111 22334',
      },
    ]);

    console.log(`Seeded ${enterprises.length} enterprises.`);

    const gangaDairy = enterprises[0];
    const kisanAgro = enterprises[3];

    // Seed Transactions
    await Transaction.create([
      {
        enterpriseId: gangaDairy._id,
        type: 'Income',
        amount: 42500,
        category: 'Milk Supply',
        description: 'Morning bulk supply to regional cooperative',
        timestamp: new Date(Date.now() - 3600000 * 2),
      },
      {
        enterpriseId: gangaDairy._id,
        type: 'Expense',
        amount: 3200,
        category: 'Cattle Feed',
        description: 'Organic fodder purchase',
        timestamp: new Date(Date.now() - 3600000 * 24),
      },
      {
        enterpriseId: kisanAgro._id,
        type: 'Income',
        amount: 15400,
        category: 'Processed Grain',
        description: 'Wholesale batch order',
        timestamp: new Date(Date.now() - 3600000 * 48),
      },
      {
        enterpriseId: kisanAgro._id,
        type: 'Expense',
        amount: 12400,
        category: 'Equipment Maintenance',
        description: 'Chiller motor replacement parts',
        timestamp: new Date(Date.now() - 3600000 * 72),
      },
    ]);

    console.log('Seeded sample transactions.');

    // Seed IoT Telemetry
    await IoTTelemetry.create([
      {
        enterpriseId: gangaDairy._id,
        metricName: 'Temperature',
        numericValue: 4.2,
        unit: '°C',
        status: 'Normal',
        timestamp: new Date(),
      },
      {
        enterpriseId: gangaDairy._id,
        metricName: 'Vibration',
        numericValue: 1.2,
        unit: 'mm/s',
        status: 'Normal',
        timestamp: new Date(),
      },
      {
        enterpriseId: kisanAgro._id,
        metricName: 'Vibration',
        numericValue: 8.5,
        unit: 'mm/s',
        status: 'Alert',
        timestamp: new Date(),
      },
      {
        enterpriseId: kisanAgro._id,
        metricName: 'Temperature',
        numericValue: 12.8,
        unit: '°C',
        status: 'Alert',
        timestamp: new Date(),
      },
    ]);

    console.log('Seeded sample IoT telemetry records.');

    return {
      message: 'Database seeded successfully',
      enterpriseCount: enterprises.length,
    };
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

// Execute if run directly via ts-node src/seed.ts
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding finished. Exiting process.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding failed:', err);
      process.exit(1);
    });
}
