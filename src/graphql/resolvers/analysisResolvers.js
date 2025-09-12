import Patient from "../../models/patientModel.js";

const listAge = ["0-10", "11-20", "21-35", "36-50", ">50"];

const analysisResolvers = {
  Query: {
    percentGender: async () => {
      try {
        const result = await Patient.aggregate([
          {
            $group: {
              _id: "$gender",
              count: { $sum: 1 },
            },
          },
        ]);

        // Tính tổng
        const total = result.reduce((sum, item) => sum + item.count, 0);

        // Mặc định 0
        let male = 0,
          female = 0,
          other = 0;

        result.forEach((item) => {
          if (item._id === "Male")
            male = Math.round((item.count / total) * 100);
          else if (item._id === "Female")
            female = Math.round((item.count / total) * 100);
          else other = Math.round((item.count / total) * 100);
        });

        return { male, female, other };
      } catch (err) {
        throw new Error(`Error: ${err.message}`);
      }
    },

    distributeAge: async () => {
      try {
        const patients = await Patient.find({}, { dob: 1 }); // chỉ lấy dob

        // Khởi tạo count map
        const ageDistribution = listAge.reduce((acc, range) => {
          acc[range] = 0;
          return acc;
        }, {});

        const today = new Date();

        patients.forEach((p) => {
          if (!p.dob) return;
          const birthDate = new Date(p.dob);
          if (isNaN(birthDate)) return;

          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--; // chưa tới sinh nhật năm nay
          }

          // Gán tuổi vào nhóm
          for (const range of listAge) {
            if (range.startsWith(">")) {
              const threshold = Number(range.slice(1));
              if (Number.isFinite(threshold) && age > threshold) {
                ageDistribution[range]++;
              }
              continue; 
            }

            const [min, max] = range.split("-").map(Number);
            if (age >= min && age <= max) {
              ageDistribution[range]++;
              break;
            }
          }
        });

        // Chuyển thành array kết quả
        return listAge.map((range) => ({
          ageType: range,
          value: ageDistribution[range] || 0,
        }));
      } catch (err) {
        throw new Error(`Error: ${err.message}`);
      }
    },
  },
};

export default analysisResolvers;
