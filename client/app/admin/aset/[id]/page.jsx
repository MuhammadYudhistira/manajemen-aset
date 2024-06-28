"use client";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Link from "next/link";
import SkeletonLoading from "@/components/(global)/SkeletonLoading";
import moment from "moment";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import { Spinner } from "@nextui-org/react";

const page = ({ params }) => {

  const { data, isLoading } = useFetchDetailAset(params.id)

  return (
    <>
      <div className="hidden sm:flex md:flex-row justify-end items-center gap-5 mt-8">
        <button className="btn bg-white text-black">
          <AddCircleOutlineOutlinedIcon /> Tambah Detail Aset
        </button>
        <button className="btn bg-white text-black">
          <EditOutlinedIcon /> Edit Aset
        </button>
        <button className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300">
          <DeleteOutlineOutlinedIcon /> Delete Aset
        </button>
      </div>
      <div className="mt-4 p-5 bg-white rounded-xl grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {isLoading ? (
          <div className="mx-auto mt-8 col-span-3">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <div className="dropdown sm:hidden">
              <div tabIndex={0} role="button">
                <MoreHorizIcon />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 space-y-2"
              >
                <li>
                  <button className="btn bg-white text-black">
                    <AddCircleOutlineOutlinedIcon /> Tambah Detail Aset
                  </button>
                </li>
                <li>
                  <button className="btn bg-white text-black">
                    <EditOutlinedIcon /> Edit Aset
                  </button>
                </li>
                <li>
                  <button className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300">
                    <DeleteOutlineOutlinedIcon /> Delete Aset
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <img
                alt=""
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                className="w-full rounded-lg object-cover"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl lg:text-3xl font-bold uppercase">
                {data?.nama_barang}
              </h1>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Merk</h3>
                <p className=" text-gray-400">{data?.merk}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Tahun Perolehan</h3>
                <p className=" text-gray-400">
                  {moment(data?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Harga Satuan</h3>
                <p className=" text-gray-400">{data?.harga_satuan}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Jumlah Barang</h3>
                <p className=" text-gray-400">{data?.jumlah_barang}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Nilai Perolehan</h3>
                <p className=" text-gray-400">{data?.nilai_perolehan}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Ukuran</h3>
                <p className=" text-gray-400">{data?.ukuran}</p>
              </div>
            </div>
          </>
        )}

      </div>
      <div className="mt-4 p-5 bg-white rounded-xl">
        <h1>Detail Aset</h1>
        {isLoading ? (
          <div className="flex justify-center mt-8">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto mt-6">
            {data?.Detail_Aset.length === 0 ? "Belum Ada Detail Aset" :
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="text-center md:text-left">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Kode Barang
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Ruangan
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      Tanggal
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      PJ
                    </th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {data?.Detail_Aset.map((detail) => {
                    return (
                      <tr key={detail.id}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          {detail.kode_barang}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {detail.ruangan.nama_ruangan}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {detail.createdAt}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          <div className="avatar">
                            {/* <div className="w-10 rounded-full">
                          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div> */}
                            <p>
                              {detail.Penanggung_Jawab.length !== 0
                                ? detail?.Penanggung_Jawab[0]?.user?.nama
                                : "Belum ada penanggung jawab"}
                            </p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <div className="lg:tooltip" data-tip="Detail">
                            <Link
                              href={`/admin/aset/${params.id}/detail-aset/${detail.id}`}
                            >
                              <MoreHorizIcon />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }

          </div>
        )}
      </div>
      <br />
    </>
  );
};

export default page;
