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

  const selectedRuangan = ruangan.find((r) => r.id === selectedId);

  const data = ruangan;
  const columnHelper = createColumnHelper();

  const columns = [
    {
      header: "Nama Ruangan",
      accessorKey: "nama_lokasi",
    },
    columnHelper.accessor("createdAt", {
      cell: (tanggal) => moment(tanggal.getValue()).format("DD-MM-YYYY"),
      header: "Tanggal",
    }),
  ];

  const handleDeleteClik = (id) => {
    const confirmation = confirm(
      "Apakah anda yakin akan menghapus data ruangan?",
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
      nama_lokasi: selectedRuangan?.nama_lokasi || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const { nama_lokasi } = formik.values;
      editRuangan({ id: selectedId, body: nama_lokasi });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (isLoading) {
    return <Spinner />
  }

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
                      <span className="label-text">Nama Lokasi</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Nama Lokasi"
                      name="nama_lokasi"
                      value={formik.values.nama_lokasi}
                      onChange={handleFormInput}
                      className="input bg-blue-50 text-sm text-black"
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
