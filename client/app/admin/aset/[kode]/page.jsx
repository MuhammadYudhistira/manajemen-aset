"use client";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import React, { Suspense } from "react";
import { Link } from 'next-view-transitions'
import moment from "moment";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import {
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import Image from "next/legacy/image";
import computer from "@/public/computer.jpg";
import { useDeleteAset } from "@/hooks/aset/useDeleteAset";
import { notFound, redirect } from "next/navigation";
import { toast } from "sonner";

const page = ({ params }) => {
  const { data, isLoading, isError, error } = useFetchDetailAset(params.kode);
  console.log("🚀 ~ page ~ data:", data)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  if (isError) {
    if (error.response.data.status === 404) {
      notFound()
    }
  }

  const handleClick = () => {
    deleteAset(data?.kode_barang);
  };

  const { mutate: deleteAset, isSuccess } = useDeleteAset({
    onSuccess: () => {
      toast.info("Berhasil menghapus aset");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  if (isSuccess) {
    redirect("/admin/aset");
  }

  return (
    <>
      <div className="mt-8 hidden items-center justify-end gap-5 sm:flex md:flex-row">
        <div className="mr-auto hidden rounded-md bg-white font-medium md:block">
          <Breadcrumbs variant="bordered" radius="sm">
            <BreadcrumbItem href="/admin">Home</BreadcrumbItem>
            <BreadcrumbItem href="/admin/aset">List Barang</BreadcrumbItem>
            <BreadcrumbItem href={`/admin/aset/${data?.kode_barang}`}>
              Barang
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <Suspense fallback={<Spinner />}>
          <>
            {/* <Link
              href={`/admin/aset/${params.kode}/create`}
              className="btn bg-white text-black"
            >
              <AddCircleOutlineOutlinedIcon /> Tambah Detail Aset
            </Link> */}
            <Link
              href={`/admin/aset/${data?.kode_barang}/edit`}
              className="btn bg-white text-black"
            >
              <EditOutlinedIcon /> Edit Barang
            </Link>
            <Button
              onPress={onOpen}
              className="btn bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
            >
              <DeleteOutlineOutlinedIcon /> Delete Barang
            </Button>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              size="xl"
            >
              <ModalContent className="p-5">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-row gap-1 text-red-500">
                      <WarningAmberOutlinedIcon />
                      <p>Warning</p>
                    </ModalHeader>
                    <ModalBody>
                      <p>Apakah anda yakin akan menghapus aset ini??</p>
                      <p className="text-xs first-letter:text-red-500">
                        * jika menghapus aset ini, maka detail aset juga akan
                        dihapus!!
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        className="bg-red-500 text-white"
                        onClick={handleClick}
                        onPress={onClose}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        </Suspense>
      </div>
      <Suspense fallback={<Spinner />}>
        <>
          <div className="dropdown rounded-xl bg-white p-2 border sm:hidden">
            <div tabIndex={0} role="button">
              <MoreHorizIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-72 space-y-2 rounded-box bg-base-100 p-2 shadow"
            >
              {/* <li>
                <Link
                  href={`/admin/aset/${params.id}/create`}
                  className="btn bg-white text-black"
                >
                  <AddCircleOutlineOutlinedIcon /> Tambah Detail Aset
                </Link>
              </li> */}
              <li>
                <Link
                  href={`/admin/aset/${data?.kode_barang}/edit`}
                  className="btn bg-white text-black"
                >
                  <EditOutlinedIcon /> Edit Barang
                </Link>
              </li>
              <li>
                <Button
                  onPress={onOpen}
                  className="btn bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
                >
                  <DeleteOutlineOutlinedIcon /> Delete Barang
                </Button>
              </li>
            </ul>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 lg:grid-cols-3 lg:gap-8">
            {isLoading ? (
              <div className="flex w-full h-full flex-col gap-4">
                <div className="skeleton h-96 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ) : (
              <>
                <div className="w-full">
                  <Image
                    alt={data?.nama_barang || "Aset"}
                    src={data?.image || computer}
                    priority
                    width={600}
                    height={450}
                    className="max-h-[450px] rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <h1 className="text-xl font-bold uppercase lg:text-3xl">
                    {data.nama_barang}
                  </h1>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Kode Barang</h3>
                    <p className="text-gray-400">{data.kode_barang}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Jumlah Barang</h3>
                    <p className="text-gray-400">{data?.Detail_Pengadaan?.length}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Jenis Aset</h3>
                    <p className="text-gray-400">{data.jenis_barang}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-4 rounded-xl bg-white p-5">
            <h1>Detail Aset</h1>
            {isLoading ? (
              <div className="mt-8 flex justify-center">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                {data?.Detail_Pengadaan?.length === 0 ? (
                  "Belum Ada Detail Aset"
                ) : (
                  <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="text-center md:text-left">
                      <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Kode Aset
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Lokasi
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Tahun Perolehan
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          PJ
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                          Status
                        </th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {data?.Detail_Pengadaan?.map((detail) => {
                        return (
                          <tr key={detail.id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                              {detail.id}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {detail.lokasi.nama_lokasi}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {moment(detail.tahun_perolehan).format("DD-MM-YYYY")}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              <div className="avatar">
                                <p>{detail.user.nama}</p>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                              {detail.status}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2">
                              <div className="lg:tooltip" data-tip="Detail">
                                <Link
                                  href={`/admin/detail_aset/${detail.id}`}
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
                )}
              </div>
            )}
          </div>
        </>
      </Suspense>
      <br />
    </>
  );
};

export default page;
