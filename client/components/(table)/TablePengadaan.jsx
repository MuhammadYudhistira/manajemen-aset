'use client'
import { useFetchPengadaan } from '@/hooks/pengadaan/useFetchPengadaan';
import { Spinner } from '@nextui-org/react';
import { useRouter } from "next/navigation";
import React from 'react'
import BasicTable from './BasicTable';
import moment from 'moment';
import { useDeletePengadaan } from '@/hooks/pengadaan/UsedeletePengadaan';
import { toast } from 'sonner';

const TablePengadaan = () => {

  const { data, isLoading, refetch } = useFetchPengadaan()
  const router = useRouter();

  const { mutate: deletePengadaan } = useDeletePengadaan({
    onSuccess: () => {
      toast.info("Berhasil menghapus data")
      refetch()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const columns = [
    {
      header: "Nomor Pengadaan",
      accessorKey: "nomor_pengadaan",
      cell: (info) => {
        const text = info.getValue();
        return <p className="">{text}</p>;
      },
    },
    {
      header: "Nama Vendor",
      accessorKey: "nama_vendor",
    },
    {
      header: "Tanggal Pengadaan",
      accessorKey: "tanggal_pengadaan",
      cell: (info) => <p>{moment(info.getValue()).format("DD-MM-YYYY")}</p>,
    },
  ];

  const handleNewItemClick = (nomor_pengadaan) => {
    router.push(`/admin/pengadaan/${nomor_pengadaan}`);
  };

  const handleDeleteClik = (nomor) => {
    const confirmation = confirm(
      `Jika menghapus data ini maka juga akan menghapus data detail aset!
      Apakah anda yakin akan menghapus data pengadaan ini?
      `,
    );
    if (confirmation) {
      deletePengadaan(nomor)
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center">
      <Spinner />
    </div>
  }

  return (
    <>
      <BasicTable
        data={data}
        columns={columns}
        handleNewItemClick={handleNewItemClick}
        handleDeleteClick={handleDeleteClik}
      />
    </>
  );
}

export default TablePengadaan