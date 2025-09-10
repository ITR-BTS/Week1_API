import physicianModel from "../models/physicianModel.js";

const createPhysician = async (req, res) => {
  try {
    const { email, title, phone, gender, dob } = req.body;
    const physicianData = { email, title, phone, gender, dob };
    const newPhysician = new physicianModel(physicianData);
    await newPhysician.save();
    res.status(201).json(newPhysician);
  } catch (error) { 
    res.status(400).json({ error: error.message });
  }
};

const getAllPhysicians = async (req, res) => {
  try {
    const physicians = await physicianModel.find();
    res.status(200).json(physicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { createPhysician, getAllPhysicians }; 