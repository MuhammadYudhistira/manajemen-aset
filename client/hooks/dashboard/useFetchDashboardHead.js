import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDashboardHead = () => {
  return useQuery({
    queryKey: ["dashboardHead"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/dashboard/head`);
      return response.data.payload;
    },
    retry: false,
  });
};
