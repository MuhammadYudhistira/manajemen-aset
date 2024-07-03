"use client";
import React, { useMemo } from "react";
import BasicTable from "./BasicTable";
import { createColumnHelper } from "@tanstack/react-table";
import { Image, Tooltip } from "@nextui-org/react";
import { useFetchCustodian } from "@/hooks/penanggung_jawab/useFetchCustodian";
import moment from "moment";
import Link from "next/link";

const TablePJ = () => {
  const { data: penanggungJawab, isLoading } = useFetchCustodian();
  console.log("🚀 ~ TablePJ ~ penanggungJawab:", penanggungJawab);

  const columns = [
    {
      header: "Nama Aset",
      accessorKey: "detail_aset.aset.nama_barang",
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
        const userId = row.user?.id; // Get user ID from the row data
        return (
          <Link href={`/admin/user/${userId}`}>
            <Tooltip content={row.user?.nama}>
              <Image
                src={`https://storage.googleapis.com/manajemen-aset/${info.getValue()}`}
                alt=""
                className="size-4 md:size-10 rounded-full object-cover"
              />
            </Tooltip>
          </Link>
        );
      },
    },
  ];
  return (
    <>
      <BasicTable data={penanggungJawab} columns={columns} />
    </>
  );
};

export default TablePJ;
