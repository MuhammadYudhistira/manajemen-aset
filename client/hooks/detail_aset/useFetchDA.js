import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDA = (kode_detail) => {
  return useQuery({
    queryKey: ["detail-aset"],
    queryFn: async () => {
      const response = await axios.get(`/detail-aset/${kode_detail}`);
      return response.data.payload;
    },
    retry: false,
  });
};
