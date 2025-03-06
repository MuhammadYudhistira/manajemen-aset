'use client'
import { useFetchDetailPengajuan } from '@/hooks/pengajuan/useFetchDetailPengajuan'
import moment from 'moment'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { useFormik } from 'formik';
import { useAcceptPengajuan } from '@/hooks/pengajuan/useAcceptPengajuan';
import { useRejectPengajuan } from '@/hooks/pengajuan/useRejectPengajuan';
import { toast } from 'sonner';

const page = ({ params }) => {
  const { data, refetch } = useFetchDetailPengajuan(params.no_pengajuan)

  const no_pengajuan = params.no_pengajuan

  const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

  const { mutate: acceptPengajuan, isSuccess: acceptSuccess } = useAcceptPengajuan({
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    },
    onSuccess: () => {
      toast.success("Berhasil menyetujui laporan")
    }
  })

  const { mutate: rejectPengajuan, isSuccess: rejectSuccess } = useRejectPengajuan({
    onError: (error) => {
      console.log(error)
    },
    onSuccess: () => {
      toast.success("Berhasil menolak laporan")
    }
  })

  const formik = useFormik({
    initialValues: {
      keterangan: "",
    },
    onSubmit: () => {
      const { keterangan } = formik.values;
      rejectPengajuan({ no: no_pengajuan, keterangan })
    },
  });

  const handleAcceptClick = () => {
    acceptPengajuan(no_pengajuan)
  }

  const handleFormInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  if (rejectSuccess || acceptSuccess) {
    refetch()
  }

  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        <div className="mt-8 items-center justify-end gap-3 flex flex-col md:flex-row">
          {data?.status !== "Completed" && (
            <>
              {data?.status === "Rejected" && (
                <Button onPress={onOpen1} className="btn bg-white text-black border border-black w-full md:w-auto">
                  <CheckOutlinedIcon /> Setuju
                </Button>
              )}
              {data?.status === "Approved" && (
                <Button onPress={onOpen2} className="btn bg-white text-black border border-black w-full md:w-auto">
                  <CloseOutlinedIcon /> Tolak
                </Button>
              )}
              {data?.status === "Pending" && (
                <>
                  <Button onPress={onOpen1} className="btn bg-white text-black border border-black w-full md:w-auto">
                    <CheckOutlinedIcon /> Setuju
                  </Button>
                  <Button onPress={onOpen2} className="btn bg-white text-black border border-black w-full md:w-auto">
                    <CloseOutlinedIcon /> Tolak
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>{data?.title}</h2>
            <div className='flex flex-col md:flex-row gap-3'>

            </div>
          </div>
          <div className="divider"></div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="grid gap-1">
              <div className="text-sm font-medium">Nomor Pengajuan</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground text-gray-400">
                {data?.no_pengajuan}
              </div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium">Unit Pengusul</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground text-gray-400">
                <RoomIcon className='text-[18px]' /> {data?.unit_pengajuan}
              </div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium">Tanggal Pengajuan</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground text-gray-400">
                <CalendarMonthOutlinedIcon className='text-[18px]' /> {moment(data?.tanggal_pengajuan).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium">Status</div>
              <div className={`
                    badge text-xs 
                    ${data?.status === "Pending" ? "bg-blue-100 text-blue-600" : ""}
                    ${data?.status === "Approved" ? "bg-green-100 text-green-600" : ""}
                    ${data?.status === "Rejected" ? "bg-red-100 text-red-600" : ""}
                    ${data?.status === "Cancelled" ? "bg-yellow-100 text-yellow-600" : ""}`}>
                {data?.status}
              </div>
            </div>
          </div>

        </div>
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <h2 className='text-xl font-semibold'>Barang di Request</h2>
          <p className='text-sm text-gray-400'>Total terdapat {data?.Detail_Pengajuan?.length} barang yang berbeda</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.Detail_Pengajuan?.map((barang, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{barang?.Barang?.nama_barang}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Kode Barang : {barang?.Barang?.kode_barang}</p>
                  <p className="text-sm text-muted-foreground">Jenis Barang : {barang?.Barang?.jenis_barang}</p>
                </div>
                <div className="rounded-full px-3 py-1 text-sm font-medium bg-gray-200 text-gray-600">
                  Qty: {barang.jumlah_barang}
                </div>
              </div>
            ))}
          </div>
        </div>

        {data?.status === "Rejected" && (
          <div className="bg-white rounded-xl p-5 space-y-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-red-500 font-semibold">Keterangan Ditolak</span>
              </div>
              <input
                type="text"
                placeholder="Disetujui Oleh"
                name="nama"
                className="input bg-red-50 text-sm text-red-500"
                value={data.keterangan}
                readOnly
              />
            </label>
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpen1}
        onOpenChange={onOpenChange1}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="xl"
      >
        <ModalContent className="p-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1 text-blue-500">
                <InfoOutlinedIcon />
                <p className="text-blue-500">APPROVAL</p>
              </ModalHeader>
              <ModalBody>
                <p>Apakah anda yakin akan menyetujui Laporan Pengajuan ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-blue-500 text-white"
                  onPress={handleAcceptClick}
                  onClick={onClose}
                >
                  Setuju
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="xl"
      >
        <ModalContent className="p-5">
          {(onClose) => (
            <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-row gap-1 text-red-500">
                <WarningAmberOutlinedIcon />
                <p>Warning</p>
              </ModalHeader>
              <ModalBody>
                <p>Berikan keterangan kenapa anda menolak Laporan Pengajuan ini!</p>
                <textarea
                  type="text"
                  placeholder="Type here"
                  name="keterangan"
                  onChange={handleFormInput}
                  className="input textarea input-bordered w-full min-h-20" required />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  type="submit"
                  onPress={onClose}
                >
                  Tolak
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default page