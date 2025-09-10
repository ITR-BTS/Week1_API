
import Patient from '../../models/patientModel.js';
import Physician from '../../models/physicianModel.js';

const patientResolvers = {
  Query: {
    patients: async (_, { page = 1, limit = 10, filter = {} }) => {
      try {
        const skip = (page - 1) * limit;
        const query = {};
        if (filter.physicianId) query.physician = filter.physicianId;
        const [patients, total] = await Promise.all([
          Patient.find(query)
            .populate('physician')
            .skip(skip)
            .limit(limit),
          Patient.countDocuments(query)
        ]);
        return {
          data: patients,
          total,
          page,
          totalPages: Math.ceil(total / limit)
        };
      } catch (err) {
        throw new Error('Failed to fetch patients');
      }
    },
    patientByEmail: async (_, { email }) => {
           return Patient.findOne({email}).populate('physician');
    }
  },
  Mutation: {
    createPatient: async (_, { email, phone, gender, dob, physician, addressInfo }) => {
      // Validate physician exists
      const physicianExists = await Physician.findById(physician);
      if (!physicianExists) throw new Error('Physician not found');
      const patient = new Patient({ email, phone, gender, dob, physician, addressInfo });
      await patient.save();
      return patient.populate('physician');
    },
    updatePatient: async (_, { id, input }) => {
      const patient = await Patient.findByIdAndUpdate(id, input, { new: true }).populate('physician');
      if (!patient) throw new Error('Patient not found');
      return patient;
    },
    deletePatient: async (_, { id }) => {
      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) throw new Error('Patient not found');
      return true;
    }
  }
};

export default patientResolvers;
