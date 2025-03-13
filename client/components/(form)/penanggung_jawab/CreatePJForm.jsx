"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useFormik } from "formik";
import { useFetchUser } from "@/hooks/user/useFetchUser";
import { toast } from "sonner";
import { useFetchUserWhoseCustodian } from "@/hooks/penanggung_jawab/useFetchUserWhoseCustodian";
import { useEditDP } from "@/hooks/detail_pengadaan/UseEditDP";
import { useFetchListDetailPengadaan } from "@/hooks/detail_pengadaan/useFetchListDetailPengadaan";

const CreatePJForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useFetchUser();
  const { data: asets, refetch: refetchAset } = useFetchListDetailPengadaan();
  const listAsets = asets?.filter((aset) => aset.nip_penanggung_jawab === null);

  const { refetch: refetchUser } = useFetchUserWhoseCustodian();

  const staffUsers = data?.users?.filter(user =>
    user.role === 'STAFF'
  );

  const { mutate: createCustodian, isPending } = useEditDP({
    onSuccess: () => {
      toast.success("Berhasil menambahkan data penanggung jawab");
      refetchUser();
      refetchAset();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      id_user: "",
      kode_detail: "",
    },
    onSubmit: () => {
      const { id_user, kode_detail } = formik.values;
      const formData = new FormData();
      formData.append("nip_penanggung_jawab", id_user);
      createCustodian({ id: kode_detail, body: formData });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <Button onPress={onOpen} className="btn bg-white text-black">
        <AddCircleOutlineOutlinedIcon /> Tambah Penanggung Jawab
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Tambah Penanggung Jawab
                </ModalHeader>
                <ModalBody>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nama Pengguna</span>
                    </div>
                    <select
                      className="select bg-blue-50 text-sm"
                      name="id_user"
                      onChange={handleFormInput}
                    >
                      <option defaultValue={""} hidden>
                        Nama Pengguna
                      </option>
                      {staffUsers.map((user) => {
                        return (
                          <option value={user.nip} key={user.nip}>
                            {user.nama}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nama Aset</span>
                    </div>
                    <select
                      className="select bg-blue-50 text-sm"
                      name="kode_detail"
                      onChange={handleFormInput}
                    >
                      <option defaultValue={""} hidden>
                        Nama Aset
                      </option>
                      {listAsets.map((aset) => {
                        return (
                          <option value={aset.id} key={aset.id}>
                            {aset.barang.nama_barang} ({aset.id})
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onPress={onClose}>
                    {isPending ? <Spinner /> : "Tambah Penanggung Jawab"}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePJForm;
