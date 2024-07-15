import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchMe = ({ throwOnError }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosPrivate("/auth/me");

      return response.data.payload;
    },
    queryKey: ["user"],
    throwOnError,
  });
};
