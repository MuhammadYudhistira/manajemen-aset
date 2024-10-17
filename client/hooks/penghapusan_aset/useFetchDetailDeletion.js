import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailDeletion = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/deletion/${id}`);
      return response.data.payload;
    },
    queryKey: ["detailDeletion"],
    retry: false,
  });
};
