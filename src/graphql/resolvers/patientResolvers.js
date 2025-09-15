import Patient from "../../models/patientModel.js";
import Physician from "../../models/physicianModel.js";

const escapeRegex = (s = "") =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const patientResolvers = {
  Query: {
    patients: async (_, { page = 1, limit = 10, action = {} }) => {
      try {
        const skip = (page - 1) * limit;
        const query = {};

        // lọc theo gender
        if (action.gender && action.gender !== "all") {
          query.gender =
            action.gender.charAt(0).toUpperCase() +
            action.gender.slice(1).toLowerCase();
        }

        // search theo patient.email
        if (action.search && action.search.trim()) {
          const term = escapeRegex(action.search.trim());
          query.email = { $regex: term, $options: "i" }; // case-insensitive
        }

        // sort theo patient.email
        let sort = {};
        if (action.sortEmail) {
          sort.email = action.sortEmail.toLowerCase() === "asc" ? 1 : -1;
        }

        let patients, total;

        if (action.sortPhyEmail) {
          // sort theo physician.email + vẫn áp dụng query (gender + search patient.email)
          const pipeline = [
            { $match: query },
            {
              $lookup: {
                from: "physicians",
                localField: "physician",
                foreignField: "_id",
                as: "physician",
              },
            },
            { $unwind: "$physician" }, // chỉ giữ record có physician để sort theo email bác sĩ
            {
              $sort: {
                "physician.email":
                  action.sortPhyEmail.toLowerCase() === "asc" ? 1 : -1,
              },
            },
            { $skip: skip },
            { $limit: limit },
          ];

          patients = await Patient.aggregate(pipeline);
          total = await Patient.countDocuments(query);

          // chuyển _id -> id cho GraphQL
          patients = patients.map((p) => ({
            ...p,
            id: p._id.toString(),
            physician: p.physician
              ? { ...p.physician, id: p.physician._id.toString() }
              : null,
          }));
        } else {
          patients = await Patient.find(query)
            .populate("physician")
            .sort(sort)
            .skip(skip)
            .limit(limit);

          total = await Patient.countDocuments(query);
        }

        return {
          data: patients,
          pageSize: limit,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        };
      } catch (err) {
        throw new Error(`Failed: ${err.message}`);
      }
    },
    countPatients: async (_, {}) => {
      return Patient.countDocuments();
    },
    patientByEmail: async (_, { email }) => {
      return Patient.find({
        email: { $regex: email, $options: "i" },
      }).populate("physician");
    },
    patientDetails: async (_, { id }) => {
      const patient = await Patient.findById(id).populate("physician");
      if (!patient) throw new Error("Patient not found");
      return patient;
    },
  },
  Mutation: {
    createPatient: async (
      _,
      { input }
    ) => {
      const physicianExists = await Physician.findById(input.physician);
      if (!physicianExists) throw new Error("Physician not found");
      const patient = new Patient({
        ...input
      });
      await patient.save();
      return patient.populate("physician");
    },
    updatePatient: async (_, { id, input }) => {
      const patient = await Patient.findByIdAndUpdate(id, input, {
        new: true,
      }).populate("physician"); 
      if (!patient) throw new Error("Patient not found");
      return patient;
    },
    deletePatient: async (_, { id }) => {
      const patient = await Patient.findByIdAndDelete(id);
      if (!patient) throw new Error("Patient not found");
      return true;
    },
  },
};

export default patientResolvers;
