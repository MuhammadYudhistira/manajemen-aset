import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDashboardSekwan = () => {
  return useQuery({
    queryKey: ["dashboardSekwan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/dashboard/sekwan`);
      return response.data.payload;
    },
    retry: false,
  });
};
