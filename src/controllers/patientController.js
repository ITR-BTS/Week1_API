import patientModel from '../models/patientModel.js';

const createPatient = async (req, res) => {
  try {
    const { email, phone, gender, dob, physician, addressInfo  } = req.body;
    const patientData = { email, phone, gender, dob, physician, addressInfo };
    const newPatient = new patientModel(patientData);
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
};
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find().populate('physician');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createPatient, getAllPatients };