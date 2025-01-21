import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPengadaan = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/pengadaan");
      return response.data.payload;
    },
    queryKey: ["pengadaan"],
  });
};
