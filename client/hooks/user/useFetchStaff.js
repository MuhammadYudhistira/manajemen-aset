import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchStaff = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/user/staff");

      return response.data.payload;
    },
    queryKey: ["users"],
  });
};
