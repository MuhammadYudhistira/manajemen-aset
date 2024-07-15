import { axiosPrivate } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchAsetByUser = () => {
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/aset/penanggung-jawab");
      return response.data.payload;
    },
  });
};
