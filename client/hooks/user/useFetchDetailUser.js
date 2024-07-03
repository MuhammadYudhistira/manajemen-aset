import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailUser = (id) => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(`/user/${id}`);
      return response.data.payload;
    },
    queryKey: ["user"],
    initialData: ["user"],
  });
};
