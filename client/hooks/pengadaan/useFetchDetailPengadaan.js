import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailPengadaan = (nomor) => {
  return useQuery({
    queryKey: ["detail-pengadaan"],
    retry: false,
    queryFn: async () => {
      const response = await axios.get(`/pengadaan/${nomor}`);
      return response.data.payload;
    },
  });
};
