"use client";
import React, { useState } from "react";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import computer from "@/public/computer.jpg"

import Image from "next/legacy/image";
import Link from "next/link";
import { useFetchDA } from "@/hooks/detail_aset/useFetchDA";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  BreadcrumbItem, Breadcrumbs,
  Tooltip
} from "@nextui-org/react";
import { useDeleteDA } from "@/hooks/detail_aset/useDeleteDA";
import { toast } from "sonner";
import { notFound, redirect } from "next/navigation";
import moment from "moment";
import QrCode from "@/components/(reports)/QrCode";
import { useArchiveDA } from "@/hooks/detail_aset/useArchiveDA";
import { formatRupiah } from "@/libs/formatRupiah";

const page = ({ params }) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: arsipIsOpen, onOpen: arsipOnOpen, onOpenChange: arsipOnOpenChange } = useDisclosure();
  const { data, isLoading, isError, error, refetch } = useFetchDA(params.kode_detail);
  const [keterangan, setKeterangan] = useState(null)

  if (isError) {
    if (error.response?.data?.status === 404) {
      console.log(error);
      notFound();
    } else {
      return <div>Error: {error.message}</div>
    }
  }


  const { mutate: deleteDA, isSuccess } = useDeleteDA({
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    },
    onSuccess: () => {
      toast.info("Berhasil mengahapus detail aset")
    }
  })

  const { mutate: archiveDA } = useArchiveDA({
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    },
    onSuccess: () => {
      toast.info("Berhasil mengarsipkan aset")
      refetch()
    }
  })


  const handleClick = () => {
    deleteDA({ id: params.id, iddetail: params.iddetail })
  }

  const handleArchiveClick = () => {
    const body = {
      keterangan: keterangan,
      action: data.status === "Inactive" ? "unarchive" : "archive",
    };
    archiveDA({ id: params.iddetail, body })
  }

  if (isSuccess) {
    redirect(`/admin/aset/${params.id}`)
  }

  return (
    <>
      <div className="mt-8 hidden items-center justify-end gap-5 sm:flex md:flex-row">
        <div className="mr-auto hidden rounded-md bg-white font-medium xl:block">
          <Breadcrumbs variant="bordered" radius="sm">
            <BreadcrumbItem href="/admin">Home</BreadcrumbItem>
            <BreadcrumbItem href="/admin/aset">List Aset</BreadcrumbItem>
            <BreadcrumbItem href={`/admin/aset/${data?.aset?.kode_barang}`}>
              Aset
            </BreadcrumbItem>
            <BreadcrumbItem>Detail Aset</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <QrCode
          aset={`${data?.aset?.nama_barang} ${data?.merk}`}
          kode_detail={data?.kode_detail}
          kode_barang={data?.kode_detail}
          ruangan={data?.lokasi?.nama_lokasi}
          tahun={moment(data?.createdAt).format("YYYY")}
        />
        <Link
          href={`/admin/aset/${params.id}/detail-aset/${params.iddetail}/edit`}
          className="btn bg-white text-black"
        >
          <EditOutlinedIcon /> Edit Detail Aset
        </Link>
        <Button
          onPress={onOpen}
          className="btn bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
        >
          <DeleteOutlineOutlinedIcon /> Delete Aset
        </Button>
        <Button
          onPress={arsipOnOpen}
          className="btn bg-white text-blue-500 hover:border-blue-300 hover:bg-blue-50"
        >
          <ArchiveOutlinedIcon /> {data?.status === "Inactive" ? "Unarchive Aset" : "Arsipkan Aset"}
        </Button>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="w-full rounded-xl bg-white p-5">
          {isLoading ? (
            <div className="flex w-full h-full flex-col gap-4">
              <div className="skeleton h-96 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ) : (
            <>
              <div className="dropdown mb-2 sm:hidden">
                <div tabIndex={0} role="button">
                  <MoreHorizIcon />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] w-72 space-y-2 rounded-box bg-base-100 p-2 shadow"
                >
                  <li>
                    <QrCode
                      aset={`${data?.aset?.nama_barang} ${data?.merk}`}
                      kode_detail={data.kode_detail}
                      kode_barang={data?.kode_detail}
                      ruangan={data?.lokasi?.nama_lokasi}
                      tahun={moment(data?.createdAt).format("YYYY")}
                    />
                  </li>
                  <li>
                    <Link
                      href={`/admin/aset/${params.id}/detail-aset/${params.iddetail}/edit`}
                      className="btn bg-white text-black"
                    >
                      <EditOutlinedIcon /> Edit Detail Aset
                    </Link>
                  </li>
                  <li>
                    <Button
                      onPress={onOpen}
                      className="btn bg-white text-red-500 hover:border-red-300 hover:bg-red-50"
                    >
                      <DeleteOutlineOutlinedIcon /> Delete Aset
                    </Button>
                  </li>

                  <li>

                    <Button
                      onPress={arsipOnOpen}
                      className="btn bg-white text-blue-500 hover:border-blue-300 hover:bg-blue-50"
                    >
                      <ArchiveOutlinedIcon /> Arsipkan aset
                    </Button>
                  </li>
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
                            <p>Apakah anda yakin akan menghapus aset ini?</p>
                            <p className="text-xs first-letter:text-red-500">
                              * jika menghapus aset ini, maka Riwayat laporan dan laporan perbaikan juga akan
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
                </ul>
              </div>
              <div className="flex w-full flex-col md:flex-row gap-8">
                <div className="flex flex-col gap-3">
                  <Image
                    alt="Aset"
                    src={
                      data?.Detail_Aset_Images
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.Detail_Aset_Images[0]?.link}`
                        : computer
                    }
                    priority
                    width={300}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl font-bold uppercase">
                    {data?.aset?.nama_barang}
                  </h1>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Kode Barang</h3>
                    <p className="text-gray-400">{data?.kode_detail}</p>
                  </div>
                  {/* <div className="space-y-2">
                    <h3 className="text-lg font-medium">Nomor Pengadaan</h3>
                    <p className="text-gray-400">{data?.nomor_pengadaan}</p>
                  </div> */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Lokasi</h3>
                    <p className="text-gray-400">{data?.lokasi?.nama_lokasi}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Harga Satuan</h3>
                    <p className="text-gray-400">{formatRupiah(data?.harga_satuan)}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Tahun Perolehan</h3>
                    <p className="text-gray-400">{moment(data?.tahun_perolehan).format("YYYY-MM-DD")}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Status</h3>
                    <p className={data.status === "Inactive" ? `text-red-500 font-semibold uppercase ` : `text-gray-400`}>{data?.status}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4 w-full">
                {data?.Detail_Aset_Images?.length > 1 ? (
                  data?.Detail_Aset_Images?.map((image) => {
                    return (
                      <Image
                        alt="Aset"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.link}`}
                        priority
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                        key={image.id}
                      />
                    )
                  })
                ) : null}
              </div>
              <div className="mt-4 flex flex-col md:flex-row justify-between">
                <div className="w-[50%] space-y-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Merk</h3>
                    <p className="text-gray-400">{data?.merk}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ukuran</h3>
                    <p className="text-gray-400">{data?.ukuran}</p>
                  </div>
                  {data?.aset?.jenis_barang === 'Kendaraan' && (<>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Nomor Rangka</h3>
                      {data?.nomor_rangka ? (
                        <p className="text-gray-400">{data?.nomor_rangka}</p>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Nomor Mesin</h3>
                      {data?.nomor_mesin ? (
                        <p className="text-gray-400">{data?.nomor_mesin}</p>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Nomor Polisi</h3>
                      {data?.nomor_polisi ? (
                        <p className="text-gray-400">{data?.nomor_polisi}</p>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Nomor BPKB</h3>
                      {data?.nomor_bpkb ? (
                        <p className="text-gray-400">{data?.nomor_bpkb}</p>
                      ) : (
                        "-"
                      )}
                    </div>
                  </>)
                  }
                  {data?.status === "Inactive" &&
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">keterangan</h3>
                      <p className="text-gray-400">{data?.keterangan !== "" ? data?.keterangan : "-"}</p>
                    </div>
                  }
                </div>
                <div className="w-[50%] mt-4">
                  <img
                    alt="qrcode"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${[process.env.NEXT_PUBLIC_QR_URL]}${params.iddetail}`}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="space-y-5">
          <div className="rounded-xl bg-white p-5">
            <h2 className="text-lg font-medium">Penanggung Jawab</h2>
            {isLoading ? (
              <div className="mt-4">
                <div className="avatar space-x-2">
                  <div className="skeleton w-16 shrink-0 rounded-full"></div>
                  <div className="skeleton w-16 shrink-0 rounded-full"></div>
                  <div className="skeleton w-16 shrink-0 rounded-full"></div>
                </div>
              </div>
            ) : (
              <>
                {data?.Penanggung_Jawab?.length > 0 ? (
                  <div className="flex gap-2 mt-4">
                    {data?.Penanggung_Jawab?.map((pj, index) => {
                      return (
                        <Tooltip showArrow placement="bottom" key={index} delay={1000}
                          content={
                            <div className="space-y-2 p-5 min-h-[121px] w-[360px]">
                              <div className="avatar">
                                <div className="w-16 rounded-full">
                                  <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pj.image}`} />
                                </div>
                              </div>
                              <p className="text-md font-semibold">{pj.nama}</p>
                              <p className="text-xs font-medium text-gray-500">{pj.nip}</p>
                              <p className="text-xs font-medium text-gray-500">{pj.role}</p>
                              <p className="text-xs font-medium text-gray-500">{pj.no_hp}</p>
                              <p className="text-xs font-medium text-gray-500">{pj.alamat}</p>
                            </div>
                          }
                        >
                          <div className="avatar">
                            <div className="w-16 rounded-full">
                              <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pj.image}`} />
                            </div>
                          </div>
                        </Tooltip>
                      )
                    })}
                  </div>
                ) : (
                  <p>Belum ada Penanggung Jawab</p>
                )}
              </>
            )}
          </div>
          <div className="space-y-2 rounded-xl bg-white p-5 max-h-[200px] overflow-y-auto">
            <h2 className="text-lg font-medium">Riwayat Laporan kerusakan</h2>
            {data?.Laporan_Kerusakan?.length > 0 ? (
              data?.Laporan_Kerusakan?.map((laporan) => {
                return (
                  <div className="flex justify-between" key={laporan.id}>
                    <div>
                      <p className="text-sm text-gray-500">{laporan.perihal}</p>
                      <p className="text-sm text-gray-500">{moment(laporan.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
                    <div>
                      <Link
                        href={`/laporan/${laporan.id}`}
                        className="btn btn-sm bg-white"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                )
              })) : (<p>Belum ada Laporan kerusakan</p>)
            }
          </div>
          <div className="space-y-2 rounded-xl bg-white p-5 max-h-[200px] overflow-y-auto">
            <h2 className="text-lg font-medium">Riwayat Laporan Perbaikan</h2>
            {data?.Laporan_Kerusakan?.length > 0 && (
              data?.Laporan_Kerusakan?.map((perbaikan) => {
                return (
                  perbaikan.Perbaikan !== null ? (
                    <div className="flex justify-between" key={perbaikan.Perbaikan.id}>
                      <div>
                        <p className="text-sm text-gray-500">{perbaikan.Perbaikan.hal}</p>
                        <p className="text-sm text-gray-500">{moment(perbaikan.Perbaikan.createdAt).format("DD-MM-YYYY")}</p>
                      </div>
                      <div>
                        <Link
                          href={`/perbaikan/${perbaikan.id}`}
                          className="btn btn-sm bg-white"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <p>Belum Ada Laporan Perbaikan</p>
                  )
                )
              }))
            }
          </div>
        </div>
      </div>

      <Modal
        isOpen={arsipIsOpen}
        onOpenChange={arsipOnOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="xl"
      >
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 text-blue-500">
                <WarningAmberOutlinedIcon />
                <p>Info</p>
              </ModalHeader>
              <ModalBody>
                {data?.status === "Inactive" ? (
                  <p className="text-sm">Apakah anda yakin akan membatalkan arsip aset ini?</p>
                ) : (
                  <>
                    <p className="text-sm">Berikan keterangan kenapa anda mengarsipkan aset ini</p>
                    <textarea
                      type="text"
                      placeholder="Type here"
                      name="keterangan"
                      onChange={(e) => setKeterangan(e.target.value)}
                      className="input textarea input-bordered w-full min-h-20" required
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-blue-500 text-white"
                  onClick={handleArchiveClick}
                  onPress={onClose}
                >
                  {data?.status === "Inactive" ? "Unarchive" : "Arsipkan"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default page;
