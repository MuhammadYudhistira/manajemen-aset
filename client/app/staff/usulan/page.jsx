'use client'
import Link from 'next/link'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useFetchListPengajuanUser } from '@/hooks/pengajuan/useFetchListPengajuanUser';
import moment from 'moment';

const page = () => {

  const { data } = useFetchListPengajuanUser()
  return (
    <>
      <div className=" flex items-center justify-end mt-10">
        <Link href={"/staff/usulan/create"} className="btn btn-neutral bg-black text-white">Create Usulan</Link>
      </div >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {data?.map((item) => {
          return (
            <div className='bg-white p-5 rounded-lg border space-y-2' key={item.no_pengajuan}>
              <h3 className='text-xl font-medium'>{item.title}</h3>
              <p className='text-gray-400 text-xs'>{item.no_pengajuan}</p>
              <div className='flex gap-4 items-center justify-start'>
                <p className='text-xs text-gray-400'><RoomIcon className='text-[18px]' />{item.unit_pengajuan}</p>
                <p className='text-xs text-gray-400'><CalendarMonthOutlinedIcon className='text-[18px]' /> {moment(item.tanggal_pengajuan).format("DD-MM-YYYY")}</p>
              </div>
              {item.Detail_Pengajuan.map((barang) => {
                return (
                  <div className='w-full border p-2 rounded-lg flex justify-between items-center' key={barang.kode_barang}>
                    <p className='text-sm'>{barang.Barang?.nama_barang}</p>
                    <p className="badge badge-soft bg-gray-200 text-xs">Qty: {barang.jumlah_barang}</p>
                  </div>
                )
              })}
              <Link href={`/staff/usulan/${item.no_pengajuan}`} className='btn btn-ghost w-full'>
                View Details
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default page