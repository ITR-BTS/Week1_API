import Physician from '~/models/physicianModel.js'

const physicianResolvers = {
  Query: {
    physicians: async () => await Physician.find()
  },

  Mutation: {
    createPhysician: async (_, args) => {
      const physician = new Physician(args)
      return await physician.save()
    }
  }
}

export default physicianResolvers