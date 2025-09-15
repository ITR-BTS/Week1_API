import DataLoader from "dataloader";
import physicianModel from "../../models/physicianModel.js";

export function createPhysicianLoader() {
  return new DataLoader(
    async (ids) => {
      // Normalize key về string để Map ổn định
      const strIds = ids.map(String);

      // Lấy tất cả bác sĩ trong 1 query
      const docs = await physicianModel.find({ _id: { $in: strIds } }).lean();

      // Map _id -> doc
      const byId = new Map(docs.map((d) => [String(d._id), d]));

      // Trả theo đúng thứ tự keys; nếu không có thì trả null
      return strIds.map((id) => byId.get(id) || null);
    },
    {
      // Mặc định cache per-request; có thể custom cacheMap nếu muốn TTL/LRU
      // cacheMap: new Map(),
    }
  );
}
