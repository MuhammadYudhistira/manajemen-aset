import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailDR = (id) => {
  return useQuery({
    queryKey: ["laporan-kerusakan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/laporan-kerusakan/${id}`);
      return response.data.payload;
    },
  });
};
