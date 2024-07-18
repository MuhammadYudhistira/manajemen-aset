import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchDRByUser = () => {
  return useQuery({
    queryKey: ["laporan-kerusakan"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/laporan-kerusakan/user");
      return response.data.payload;
    },
  });
};
