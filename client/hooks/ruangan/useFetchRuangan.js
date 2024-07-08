import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchRuangan = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/ruangan");

      return response.data.payload;
    },
    queryKey: ["ruangan"],
    initialData: ["ruangan"],
  });
};
