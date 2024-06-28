import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailAset = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/aset/${id}`);
      console.log(response);
      return response.data.payload;
    },
    queryKey: ["aset"],
  });
};
