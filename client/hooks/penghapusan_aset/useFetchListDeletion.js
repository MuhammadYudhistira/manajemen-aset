import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchListDeletion = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/deletion");
      return response.data.payload;
    },
    queryKey: ["listDeletion"],
  });
};
