import physicianModel from "../../models/physicianModel.js";

const physicianResolvers = {
  Query: {
    physicians: async () => await physicianModel.find(),
    physician: async (_, { id }) => await physicianModel.findById(id),
  },
  Mutation: {
    createPhysician: async (_, { email, title, phone, gender, dob }) => {
      const newPhysician = await physicianModel.create({
        email,
        title,
        phone,
        gender,
        dob,
      });
      return newPhysician;
    },
  },
};

export default physicianResolvers;
