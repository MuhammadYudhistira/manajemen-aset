import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useArchiveDP = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      console.log(body);
      const response = await axiosPrivate.post(
        `/detail-pengadaan/${id}/archive`,
        body,
      );
      console.log(response);
      return response;
    },
    onSuccess,
    onError,
  });
};
