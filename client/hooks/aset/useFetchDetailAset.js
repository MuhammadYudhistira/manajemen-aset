import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailAset = (kode) => {
  return useQuery({
    queryKey: ["aset"],
    retry: false,
    queryFn: async () => {
      const response = await axios.get(`/aset/${kode}`);
      return response.data.payload;
    },
  });
};
