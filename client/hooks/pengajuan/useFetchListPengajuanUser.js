import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchListPengajuanUser = () => {
  return useQuery({
    queryKey: ["listPengajuan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/pengajuan/user`);
      return response.data.payload;
    },
    retry: false,
  });
};
