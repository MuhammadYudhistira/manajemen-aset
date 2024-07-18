import { axiosPrivate } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditDamageReport = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axiosPrivate.patch(
        `/laporan-kerusakan/${id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response;
    },
    onSuccess,
    onError,
  });
};
