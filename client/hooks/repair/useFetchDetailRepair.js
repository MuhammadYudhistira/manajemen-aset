import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailRepair = (id) => {
  return useQuery({
    queryKey: ["laporan-perbaikan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/laporan-perbaikan/${id}`);
      return response.data.payload;
    },
    retry: false,
  });
};
