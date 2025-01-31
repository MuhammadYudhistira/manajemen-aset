"use client"
import { useFetchDetailPengadaan } from "@/hooks/pengadaan/useFetchDetailPengadaan";
import { formatRupiah } from "@/libs/formatRupiah";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import moment from "moment";
import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';

const page = ({ params }) => {

  const { data, isLoading, isError, error } = useFetchDetailPengadaan(params.nomor)
  console.log("🚀 ~ page ~ data:", data)

  const total_harga = data?.Detail_Aset?.reduce((acc, curr) => {
    return acc + curr.harga_satuan;
  }, 0);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    if (error?.response?.data?.message === "Data tidak ditemukan") {
      notFound()
    }
  }

  return (
    <>
      <div className="mr-auto hidden rounded-md font-medium md:block">
        <Breadcrumbs variant="bordered" radius="sm" classNames={{ list: "bg-white", }}>
          <BreadcrumbItem href="/admin">Home</BreadcrumbItem>
          <BreadcrumbItem href="/admin/pengadaan">List Pengadaan</BreadcrumbItem>
          <BreadcrumbItem >Detail Pengadaan</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="rounded-xl bg-white p-5">
        <h1 className="text-2xl font-bold">Detail Pengadaan Aset</h1>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">Nomor Pengadaan</p>
              <p className="font-bold">{data?.nomor_pengadaan}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">Nama vendor</p>
              <p className="font-bold">{data?.nama_vendor}</p>
            </div>
          </div>
          <div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">Tanggal Pengajuan</p>
              <p className="font-bold">{moment(data?.tanggal_pengadaan).format("DD-MM-YYYY")}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium">Barang</p>
              {data?.Detail_Pengadaan?.map((aset) => {
                return <p className="font-bold" key={aset?.aset?.kode_barang}>{aset.jumlah_barang} {aset?.aset.nama_barang}</p>
              })}
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
                  Lokasi
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Tahun Perolehan
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Harga Perolehan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.Detail_Aset?.map((aset) => {
                return (
                  <tr key={aset?.kode_detail}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {aset?.kode_detail}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {aset?.aset?.nama_barang}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {aset?.lokasi?.nama_lokasi}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {moment(aset?.detail_aset?.aset?.tahun_perolehan).format("DD-MM-YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {formatRupiah(aset?.harga_satuan)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td className="whitespace-nowrap px-4 py-2 text-medium font-semibold text-gray-900">Total Harga : {formatRupiah(total_harga)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {data.dokumen_pengadaan && (
        <div className="p-5 bg-white rounded-lg">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Dokumen Pengadaan</span>
            </div>
            <Link href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.dokumen_pengadaan}`} target="_blank" rel="noopener noreferrer" className="flex items-center input bg-blue-50 text-sm text-black min-h-28 md:min-h-0">
              {data?.dokumen_pengadaan.split('/').pop()} <PictureAsPdfOutlinedIcon className='ml-5' />
            </Link>
          </label>
        </div>
      )}
    </>
  );
};

export default page;
