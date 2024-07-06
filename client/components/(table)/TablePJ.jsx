"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Image, Spinner, Tooltip } from "@nextui-org/react";
import { useFetchCustodian } from "@/hooks/penanggung_jawab/useFetchCustodian";
import moment from "moment";
import Link from "next/link";
import { useDeleteCustodian } from "@/hooks/penanggung_jawab/useDeleteCustodian";
import { toast } from "sonner";

const TablePJ = () => {

  const { data: penanggungJawab, isLoading, refetch } = useFetchCustodian();
  console.log("🚀 ~ TablePJ ~ penanggungJawab:", penanggungJawab)
  const { mutate: deletePJ } = useDeleteCustodian({
    onSuccess: () => {
      toast.info("berhasil menghapus data penanggung jawab")
      refetch()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const columns = [
    {
      header: "Nama Aset",
      accessorKey: "detail_aset.aset.nama_barang",
      cell: (info) => {
        const row = info.row.original;
        const kode = row?.detail_aset?.kode_barang
        return (
          <p>{info.getValue()} ({kode})</p>
        )
      }
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
              className="size-4 md:size-10 rounded-full object-cover"
            />
          </Tooltip>
        );
      },
    },
  ];

  const handleDeleteClik = (id) => {
    const confirmation = confirm(
      "Apakah anda yakin akan menghapus data Penanggung Jawab?"
    );
    if (confirmation) {
      deletePJ(id)
    }
  };

  return (
    <>
      {isLoading ? <Spinner /> : <BasicTable data={penanggungJawab} columns={columns} handleDeleteClick={handleDeleteClik} />}
    </>
  );
};

export default TablePJ;
