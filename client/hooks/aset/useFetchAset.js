import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAset = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/aset");
      console.log(response.data.payload);
      return response.data.payload;
    },
    queryKey: ["asets"],
  });
};
