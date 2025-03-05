import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAcceptedPengajuan = () => {
  return useQuery({
    queryKey: ["acceptedPengajuan"],
    queryFn: async () => {
      const response = await axiosPrivate.get(`/pengajuan/accepted`);
      return response.data.payload;
    },
    retry: false,
  });
};
