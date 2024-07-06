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
} from "@nextui-org/react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useCreateRuangan } from "@/hooks/ruangan/useCreateRuangan";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";

const CreateRuanganForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { refetch } = useFetchRuangan();

  const formik = useFormik({
    initialValues: {
      nama_ruangan: "",
    },
    onSubmit: () => {
      console.log(formik.values);
      const { nama_ruangan } = formik.values;
      console.log("🚀 ~ CreateRuanganForm ~ nama_ruangan:", nama_ruangan);
      createRuangan(nama_ruangan);
    },
  });

  const { mutate: createRuangan, isSuccess } = useCreateRuangan({
    onSuccess: () => {
      toast.success("Berhasil menambahkan data ruangan");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      <Button onPress={onOpen} className="btn bg-white text-black">
        <AddCircleOutlineOutlinedIcon /> Tambah Ruangan
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Tambah Ruangan
                </ModalHeader>
                <ModalBody>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Nama Ruangan</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Nama Ruangan"
                      name="nama_ruangan"
                      onChange={handleFormInput}
                      className="input bg-blue-50 text-black text-sm"
                      required
                    />
                  </label>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button type="submit" color="primary" onPress={onClose}>
                    Tambah Ruangan
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

export default CreateRuanganForm;
