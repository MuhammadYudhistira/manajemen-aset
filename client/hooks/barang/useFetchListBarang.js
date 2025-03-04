import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchListBarang = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/barang");
      return response.data.payload;
    },
    queryKey: ["listBarang"],
  });
};
