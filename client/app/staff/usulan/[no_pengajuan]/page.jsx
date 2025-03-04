'use client'
import { useFetchDetailPengajuan } from '@/hooks/pengajuan/useFetchDetailPengajuan'
import moment from 'moment'
import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const page = ({ params }) => {
  const { data } = useFetchDetailPengajuan(params.no_pengajuan)
  console.log("🚀 ~ page ~ data:", data)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <div className='bg-white p-5 rounded-lg border space-y-2'>
            <h2 className='text-xl font-semibold'>{data?.title}</h2>
            <div className="divider"></div>
            <div className="grid gap-4 sm:grid-cols-3">
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
            </div>

          </div>
          <div className='bg-white p-5 rounded-lg border space-y-2'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, nulla! Accusamus officia quod assumenda cupiditate veritatis eligendi facilis, commodi optio obcaecati ullam aliquam a necessitatibus porro minima minus temporibus iusto illum aspernatur et adipisci. Molestiae corrupti adipisci mollitia sint quisquam architecto, voluptates deleniti accusamus! Quam, placeat dolorum? Debitis suscipit tempora, doloribus aliquid vel, porro laborum quod laboriosam maiores beatae unde atque nulla molestiae provident delectus cumque ad quas eveniet. Voluptas vitae iusto facilis perferendis numquam beatae. Neque odit, modi corrupti doloribus et, ipsa eius quaerat veniam, totam dolore nulla dolor delectus accusantium earum exercitationem cumque nam voluptatem. Nostrum fugit quidem quaerat doloremque sequi, impedit, quae repellat unde velit dolorum, tenetur perspiciatis facere. Tempora quas fugiat quidem soluta facilis, nostrum culpa unde vero. Officiis est earum assumenda consequatur quidem! Eum eligendi, excepturi nostrum porro neque minus voluptatem repudiandae pariatur? Hic in aperiam quisquam magnam id natus iste libero neque ea velit placeat quos et dignissimos officia, eum veniam perferendis, expedita, delectus quam. Accusantium unde autem, ea inventore at ipsam. Numquam ad quibusdam harum officiis provident nobis a, ipsam nisi soluta quos esse expedita animi, ab voluptatum inventore quidem, optio iure dicta nostrum veritatis voluptatibus. Vero rerum deleniti suscipit quod similique sed.
          </div>
        </div>
        <div className='space-y-4'>
          <div className='bg-white p-5 rounded-lg border space-y-2'>

          </div>
          <div className='bg-white p-5 rounded-lg border space-y-2'>

          </div>
        </div>
      </div>
    </>
  )
}

export default page