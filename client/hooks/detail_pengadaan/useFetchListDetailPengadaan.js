import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchListDetailPengadaan = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/detail-pengadaan");
      return response.data.payload;
    },
    queryKey: ["list-detail-pengadaan"],
  });
};
