import axios from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchActiveDP = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get("/detail-pengadaan/active");
      return response.data.payload;
    },
    queryKey: ["activeDetailPengadaan"],
  });
};
