"use client"
import { useFetchDetailDeletion } from "@/hooks/penghapusan_aset/useFetchDetailDeletion";
import { formatRupiah } from "@/libs/formatRupiah";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import moment from "moment";
import { notFound } from "next/navigation";
import React from "react";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from "sonner";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Link } from "next-view-transitions";
import { useDeleteDetailDeletion } from "@/hooks/penghapusan_aset/useDeleteDetailDeletion";
import { useEditDeletion } from "@/hooks/penghapusan_aset/useEditDeletion";
import { useFormik } from "formik";


const page = ({ params }) => {

  const { data, refetch, isError, error } = useFetchDetailDeletion(params.id)

  if (isError) {
    if (error?.response?.data?.message === "Data tidak ditemukan") {
      notFound()
    }
  }

  const { mutate: deleteDetailDeletion } = useDeleteDetailDeletion({
    onSuccess: () => {
      toast.info("Berhasil menghapus data")
      refetch()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const { mutate: editDeletion } = useEditDeletion({
    onSuccess: () => {
      toast.info("Berhasil Mengedit data")
      refetch()
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const onDeleteClick = (id) => {
    const confirmation = confirm(
      "Apakah anda yakin akan menghapus aset pada laporan ini?",
    );
    if (confirmation) {
      deleteDetailDeletion(id)
    }
  }

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };


  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      alasan_penghapusan: data?.alasan_penghapusan || "",
    },
    enableReinitialize: true,
    onSubmit: () => {
      const { title, alasan_penghapusan } = formik.values;
      const body = {
        title,
        alasan_penghapusan,
      }
      editDeletion({ id: params.id, body })
    },
  })


  return (
    <>
      <div className="mr-auto hidden rounded-md font-medium md:block">
        <Breadcrumbs variant="bordered" radius="sm" classNames={{ list: "bg-white", }}>
          <BreadcrumbItem href="/admin">Home</BreadcrumbItem>
          <BreadcrumbItem href="/admin/laporan_pemusnahan_aset">List Pengajuan Pemusnahan</BreadcrumbItem>
          <BreadcrumbItem >Edit Pengajuan Pemusnahan</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="rounded-xl bg-white p-5">
          <h1 className="text-2xl font-bold">Detail Pengajuan Pemusnahan Aset</h1>
          <div className="grid grid-cols-3 gap-8" >
            <div className="col-span-2 w-full">
              <div className="mt-4 w-full border-b border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Title</p>
                <input
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={handleFormInput}
                  className="w-full font-bold rounded-md p-2 outline-none"
                />
              </div>
              <div className="mt-4 w-full border-b border-gray-200">
                <p className="text-sm text-gray-500 font-medium">Alasan Pengajuan</p>
                <textarea
                  name="alasan_penghapusan"
                  value={formik.values.alasan_penghapusan}
                  onChange={handleFormInput}
                  className="w-full font-bold rounded-md p-2 outline-none"
                />
              </div>
            </div>
            <div className="col-span-1 w-full">
              <div className="mt-4">
                <p className="text-sm text-gray-500 font-medium">Tanggal Pengajuan</p>
                <p className="font-bold">{moment(data?.createdAt).format("DD-MM-YYYY")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium mt-4">Status</p>
                {data?.status === "Pending" && (
                  <span className="inline-flex items-center justify-center rounded-full bg-black px-2.5 py-0.5 text-white">
                    <p className="whitespace-nowrap text-sm font-semibold">{data?.status}</p>
                  </span>
                )}
                {data?.status === "Accepted" && (
                  <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    <p className="whitespace-nowrap text-sm">{data?.status}</p>
                  </span>
                )}
                {data?.status === "Rejected" && (
                  <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                    <p className="whitespace-nowrap text-sm">{data?.status}</p>
                  </span>
                )}
              </div>
              <div>
                {(data?.status === "Accepted" || data?.status === "Rejected") && (
                  <>
                    <p className="text-sm text-gray-500 font-medium mt-4">Keterangan</p>
                    <p className="whitespace-nowrap font-bold text-black">{data?.keterangan}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="my-5 overflow-x-auto">
            <h2 className="text-xl font-bold">List Aset</h2>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4">
              <thead className="text-center md:text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Kode Barang
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nama Aset
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Tahun Perolehan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Harga Perolehan
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.Detail_Penghapusan_Nilai_Aset?.map((aset) => {
                  return (
                    <tr key={aset?.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {aset?.detail_pengadaan?.id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {aset?.detail_pengadaan?.barang?.nama_barang}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {moment(aset?.detail_pengadaan?.pengadaan?.tanggal_penerimaan).format("DD-MM-YYYY")}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        {formatRupiah(aset?.detail_pengadaan?.harga_satuan)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-red-500">
                        <button onClick={() => onDeleteClick(aset?.id)}>
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="submit" className="btn bg-black text-white">Edit Pengajuan</button>
          </div>
        </div>
      </form>
      {data?.bukti_penghapusan && (
        <div className="p-5 bg-white rounded-lg">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Bukti Penghapusan</span>
            </div>
            <Link href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.bukti_penghapusan}`} target="_blank" rel="noopener noreferrer" className="flex items-center input bg-blue-50 text-sm text-black min-h-28 md:min-h-0">
              {data?.bukti_penghapusan?.split('/').pop()} <PictureAsPdfOutlinedIcon className='ml-5' />
            </Link>
          </label>
        </div>
      )}
    </>
  );
};

export default page;
