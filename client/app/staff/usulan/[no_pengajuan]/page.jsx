'use client'
import { useFetchDetailPengajuan } from '@/hooks/pengajuan/useFetchDetailPengajuan'
import moment from 'moment'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import {
  Button,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useCancelPengajuan } from '@/hooks/pengajuan/useCancelPengajuan';
import { toast } from 'sonner';

const page = ({ params }) => {
  const { data, refetch } = useFetchDetailPengajuan(params.no_pengajuan)

  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

  const { mutate: cancelPengajuan, isPending, isSuccess } = useCancelPengajuan({
    onSuccess: () => {
      toast.success('Request berhasil dibatalkan')
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })

  const handleClick = () => {
    cancelPengajuan(params.no_pengajuan)
  }

  if (isSuccess) refetch()


  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>{data?.title}</h2>
            {data?.status === "Pending" && (
              <Button onPress={onOpen2} className="btn btn-sm bg-red-500 text-white">
                {isPending ? <Spinner /> : "Batalkan"}
              </Button>
            )}
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
      </div>

      <Modal
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
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
                <p>Apakah anda yakin ingin membatalkan Request ini?</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-red-500 text-white"
                  onPress={onClose}
                  onClick={handleClick}
                >
                  Batalkan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default page