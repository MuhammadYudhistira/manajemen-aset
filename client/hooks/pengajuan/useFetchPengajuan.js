import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPengajuan = () => {
  return useQuery({
    queryKey: ["listPengajuan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/pengajuan`);
      return response.data.payload;
    },
    retry: false,
  });
};
