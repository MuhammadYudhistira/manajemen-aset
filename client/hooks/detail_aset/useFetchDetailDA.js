import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailDA = (id) => {
  return useQuery({
    queryKey: ["detail-aset"],
    queryFn: async () => {
      const response = await axios.get(`/detail-aset/${id}`);
      return response.data.payload;
    },
  });
};
