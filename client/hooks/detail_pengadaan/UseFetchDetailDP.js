import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailDP = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/detail-pengadaan/${id}`);
      return response.data.payload;
    },
    queryKey: ["detailPengadaan"],
  });
};
