import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/user");
      console.log("🚀 ~ queryFn: ~ response:", response)

      return response.data.payload;
    },
    queryKey: ["users"],
  });
};
