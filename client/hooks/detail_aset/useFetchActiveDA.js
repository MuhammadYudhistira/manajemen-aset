import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchActiveDA = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/detail-aset/active`);
      return response.data.payload;
    },
    queryKey: ["active-detail-aset"],
  });
};
