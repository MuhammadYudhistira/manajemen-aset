import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDetailPengajuan = (no_pengajuan) => {
  return useQuery({
    queryKey: ["detailPengajuan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/pengajuan/${no_pengajuan}`);
      return response.data.payload;
    },
    retry: false,
  });
};
