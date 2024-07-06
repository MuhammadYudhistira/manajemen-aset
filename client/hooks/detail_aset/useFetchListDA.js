import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchListDA = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/aset/detail-aset`);
      return response.data.payload;
    },
    queryKey: ["detail-aset"],
  });
};
