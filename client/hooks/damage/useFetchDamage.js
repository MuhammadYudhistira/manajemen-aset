import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDamage = () => {
  return useQuery({
    queryKey: ["laporan-kerusakan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/laporan-kerusakan`);
      return response.data.payload;
    },
    retry: false,
  });
};
