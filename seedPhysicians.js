import dotenv from 'dotenv';
import Physician from './src/models/physicianModel.js';
import connectDB from './src/config/mongodb.js';

dotenv.config();

const physicians = [
  {
    email: 'dr.john@example.com',
    title: 'Dr. John Smith',
    phone: '+84123456789',
    gender: 'Male',
    dob: '1980-05-10'
    //_id: 68c12a48340b597e5176d886
  },
  {
    email: 'dr.jane@example.com',
    title: 'Dr. Jane Doe',
    phone: '+84987654321',
    gender: 'Female',
    dob: '1975-08-22'
    // _id: 68c12a48340b597e5176d887
  }
];

async function seedPhysicians() {
  try {
    await connectDB();
    await Physician.deleteMany();
    const created = await Physician.insertMany(physicians);
    console.log('Seeded physicians:', created);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedPhysicians();
