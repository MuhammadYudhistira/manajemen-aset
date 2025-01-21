import axios from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeletePengadaan = ({ onError, onSuccess }) => {
  return useMutation({
    mutationFn: async (nomor) => {
      const response = await axios.delete(`/pengadaan/${nomor}`);
      console.log(response);
      return response;
    },
    onError,
    onSuccess,
  });
};
