"use client";
import React, { useState } from "react";
import BasicTable from "./BasicTable";
import { Image, Spinner, Tooltip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useFetchCustodian } from "@/hooks/penanggung_jawab/useFetchCustodian";
import moment from "moment";
import { useDeleteCustodian } from "@/hooks/penanggung_jawab/useDeleteCustodian";
import { toast } from "sonner";
import { useFormik } from "formik";
import { useFetchUser } from "@/hooks/user/useFetchUser";
import { useFetchListDA } from "@/hooks/detail_aset/useFetchListDA";
import { useEditCustodian } from "@/hooks/penanggung_jawab/useEditCustodian";

const TablePJ = () => {
  const { data: penanggungJawab, isLoading, refetch } = useFetchCustodian();
  const { data: users } = useFetchUser();
  const { data: asets } = useFetchListDA();
  const { mutate: deletePJ } = useDeleteCustodian({
    onSuccess: () => {
      toast.info("berhasil menghapus data penanggung jawab");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const { mutate: editCustodian } = useEditCustodian({
    onSuccess: () => {
      toast.success("berhasil mengupdate data");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  const columns = [
    {
      header: "Nama Aset",
      accessorKey: "detail_aset.aset.nama_barang",
      cell: (info) => {
        const row = info.row.original;
        const kode = row?.detail_aset?.kode_barang;
        return (
          <p>
            {info.getValue()} ({kode})
          </p>
        );
      },
    },
    {
      header: "Ruangan",
      accessorKey: "detail_aset.ruangan.nama_ruangan",
    },
    {
      header: "Tanggal",
      accessorKey: "createdAt",
      cell: (info) => <p>{moment(info.getValue()).format("DD-MM-YYYY")}</p>,
    },
    {
      header: "PJ",
      accessorKey: "user.image",
      cell: (info) => {
        const row = info.row.original; // Access the entire row data
        return (
          <Tooltip content={row.user?.nama}>
            <Image
              src={`https://storage.googleapis.com/manajemen-aset/${info.getValue()}`}
              alt=""
              className="size-4 rounded-full object-cover md:size-10"
            />
          </Tooltip>
        );
      },
    },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState();

  const selectedPJ = penanggungJawab.find((pj) => pj.id === selectedId);

  const handleDeleteClik = (id) => {
    const confirmation = confirm(
      "Apakah anda yakin akan menghapus data Penanggung Jawab?",
    );
    if (confirmation) {
      deletePJ(id);
    }
  };

  const formik = useFormik({
    initialValues: {
      id_user: selectedPJ?.user?.id || "",
      id_detail_aset: selectedPJ?.detail_aset?.id || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      console.log(formik.values);
      const data = {
        id_user: formik.values.id_user,
        id_detail_aset: formik.values.id_detail_aset,
      };
      editCustodian({ id: selectedId, body: data });
    },
  });

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const handleEditClick = (id) => {
    onOpen();
    setSelectedId(id);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <BasicTable
          data={penanggungJawab}
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
                      <option defaultValue={selectedPJ?.user?.id} hidden>
                        {selectedPJ?.user?.nama}
                      </option>
                      {users.users?.map((user) => {
                        return (
                          <option value={user.id} key={user.id}>
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
                      name="id_detail_aset"
                      onChange={handleFormInput}
                    >
                      <option defaultValue={selectedPJ?.detail_aset?.id} hidden>
                        {selectedPJ?.detail_aset?.aset.nama_barang} (
                        {selectedPJ?.detail_aset?.kode_barang})
                      </option>
                      {asets.map((aset) => {
                        return (
                          <option value={aset.id} key={aset.id}>
                            {aset.aset.nama_barang} ({aset.kode_barang})
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
                    Edit Penanggung Jawab
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

export default TablePJ;
