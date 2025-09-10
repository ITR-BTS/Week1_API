import Patient from '~/models/patientModel.js'

const patientResolvers = {
  Query: {
    patients: async (_parent, { page = 1, limit = 12 }) => {
      const skip = (page - 1) * limit
      return await Patient.find().populate('physician').skip(skip).limit(limit)
    },
    patient: async (_parent, { id }) => await Patient.findById(id).populate('physician')
  },

  Mutation: {
    createPatient: async (_, args) => {
      const patient = new Patient(args)
      await patient.save()
      await patient.populate('physician')

      return {
        ...patient.toObject(),
        id: patient._id.toString(),
        physician: patient.physician
          ? {
            ...patient.physician.toObject(),
            id: patient.physician._id.toString()
          }
          : null
      }
    },

    updatePatient: async (_, { id, ...rest }) => {
      return await Patient.findByIdAndUpdate(id, rest, { new: true }.populate('physician'))
    },

    deletePatient: async (_, { id }) => {
      await Patient.findByIdAndDelete(id)
      return true
    }
  }
}

export default patientResolvers