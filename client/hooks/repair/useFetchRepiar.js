import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchRepair = () => {
  return useQuery({
    queryKey: ["laporan-perbaikan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/laporan-perbaikan`);
      return response.data.payload;
    },
    retry: false,
  });
};
