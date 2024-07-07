"use client";
import React, { useState } from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import { useFetchRuangan } from "@/hooks/ruangan/useFetchRuangan";
import { useDeleteRuangan } from "@/hooks/ruangan/useDeleteRuangan";
import { toast } from "sonner";
import { useFormik } from "formik";
import { useEditRuangan } from "@/hooks/ruangan/useEditRuangan";

const TableRuangan = () => {
  const { data: ruangan, isLoading, refetch } = useFetchRuangan();
  const { mutate: deleteRuangan } = useDeleteRuangan({
    onSuccess: () => {
      toast.info("Berhasil menghapus data ruangan");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });
  const { mutate: editRuangan } = useEditRuangan({
    onSuccess: () => {
      toast.info("Berhasil mengupdate data ruangan");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState();

  const selectedRuangan = ruangan.find(r => r.id === selectedId);

  const data = ruangan;
  const columnHelper = createColumnHelper();

  const columns = [
    {
      header: "Nama Ruangan",
      accessorKey: "nama_ruangan",
    },
    columnHelper.accessor("createdAt", {
      cell: (tanggal) => moment(tanggal.getValue()).format("DD-MM-YYYY"),
      header: "Tanggal",
    }),
  ];

  const handleDeleteClik = (id) => {
    const confirmation = confirm(
      "Apakah anda yakin akan menghapus data ruangan?"
    );
    if (confirmation) {
      deleteRuangan(id);
    }
  };

  const handleEditClick = (id) => {
    onOpen();
    setSelectedId(id);
  };


  const formik = useFormik({
    initialValues: {
      nama_ruangan: selectedRuangan?.nama_ruangan || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const { nama_ruangan } = formik.values;
      editRuangan({ id: selectedId, body: nama_ruangan });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <BasicTable
          data={data}
          columns={columns}
          handleDeleteClick={handleDeleteClik}
          handleEditClick={handleEditClick}
        />
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Ruangan
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
                      value={formik.values.nama_ruangan}
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
                    Edit Ruangan
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

export default TableRuangan;
