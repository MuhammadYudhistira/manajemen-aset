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
import { useFetchListDA } from "@/hooks/detail_aset/useFetchListDA";
import { toast } from "sonner";
import { useFetchCustodian } from "@/hooks/penanggung_jawab/useFetchCustodian";
import { useCreateCustodian } from "@/hooks/penanggung_jawab/useCreateCustodian";
import { useFetchUserWhoseCustodian } from "@/hooks/penanggung_jawab/useFetchUserWhoseCustodian";

const CreatePJForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useFetchUser();
  const { data: asets } = useFetchListDA();
  const { refetch } = useFetchUserWhoseCustodian();

  const staffUsers = data?.users?.filter(user =>
    user.role === 'STAFF'
  );

  const { mutate: createCustodian, isPending } = useCreateCustodian({
    onSuccess: () => {
      toast.success("Berhasil menambahkan data penanggung jawab");
      refetch();
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
      createCustodian({ id_user, kode_detail });
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
                      {asets.map((aset) => {
                        return (
                          <option value={aset.kode_detail} key={aset.kode_detail}>
                            {aset.aset.nama_barang} ({aset.kode_detail})
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
