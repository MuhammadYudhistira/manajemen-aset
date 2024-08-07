import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDashboardAdmin = () => {
  return useQuery({
    queryKey: ["dashboardAdmin"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/dashboard/admin`);
      return response.data.payload;
    },
    retry: false,
  });
};
