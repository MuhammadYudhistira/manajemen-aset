import Link from 'next/link'
import React from 'react'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const page = () => {
  return (
    <>
      <div className=" flex items-center justify-end mt-10">
        <Link href={"/staff/usulan/create"} className="btn btn-neutral bg-black text-white">Create Usulan</Link>
      </div >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        <div className='bg-white p-5 rounded-lg border space-y-2'>
          <h3 className='text-xl font-medium'>Development Team Equipment</h3>
          <p className='text-gray-400 text-xs'>REQ-001</p>
          <div className='flex gap-4 items-center justify-start'>
            <p className='text-xs text-gray-400'><PushPinOutlinedIcon className='text-[18px]' /> Komisi 1</p>
            <p className='text-xs text-gray-400'><CalendarMonthOutlinedIcon className='text-[18px]' /> 03-03-2025</p>
          </div>
          <div className='w-full border p-2 rounded-lg flex justify-between items-center'>
            <p className='text-[14px]'>Laptop</p>
            <p className="badge badge-soft bg-gray-200 text-xs">Qty: 3</p>
          </div>
          <div className='w-full border p-2 rounded-lg flex justify-between items-center'>
            <p className='text-[14px]'>Laptop</p>
            <p className="badge badge-soft bg-gray-200 text-xs">Qty: 3</p>
          </div>
          <div className='w-full border p-2 rounded-lg flex justify-between items-center'>
            <p className='text-[14px]'>Laptop</p>
            <p className="badge badge-soft bg-gray-200 text-xs">Qty: 3</p>
          </div>

          <Link href={"/usulan/id"} className='btn btn-ghost w-full'>
            View Details
          </Link>
        </div>
      </div>
    </>
  )
}

export default page