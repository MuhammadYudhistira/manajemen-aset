import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditCustodian = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async ({ id, body }) => {
      const response = await axios.patch(`/penanggung-jawab/${id}`, {
        id_user: body.id_user,
        id_detail_aset: body.id_detail_aset,
      });
      return response;
    },
    onError,
    onSuccess,
  });
};
