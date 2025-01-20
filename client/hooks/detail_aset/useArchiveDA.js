import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useArchiveDA = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ kode_detail, body }) => {
      console.log(body);
      const response = await axiosPrivate.post(
        `/detail-aset/${kode_detail}/archive`,
        body,
      );
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
