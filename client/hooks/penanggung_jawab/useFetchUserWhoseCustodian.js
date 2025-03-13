import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserWhoseCustodian = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/penanggung-jawab/users");
      return response.data.payload;
    },
    queryKey: ["penanggungJawabUsers"],
    refetchOnWindowFocus: true,
  });
};
