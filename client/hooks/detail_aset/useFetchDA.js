import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDA = (id, iddetail) => {
  return useQuery({
    queryKey: ["detail-aset"],
    queryFn: async () => {
      const response = await axios.get(`/aset/${id}/detail-aset/${iddetail}`);
      return response.data.payload;
    },
    retry: false,
  });
};
