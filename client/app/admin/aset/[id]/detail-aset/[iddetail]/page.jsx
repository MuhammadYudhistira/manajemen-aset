"use client"
import React from 'react'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import qrcode from "@/public/qrcode.png"
import profile from "@/public/profile.jpg"
import Image from "next/legacy/image";
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from '@/libs/axios';
import moment from 'moment';
import 'moment/locale/id';

const page = ({ params }) => {

    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get(`/aset/${params.id}/detail-aset/${params.iddetail}`)

            console.log(response)
            return response.data.payload
        }
    })


    return (
        <>
            <div className="hidden sm:flex md:flex-row justify-end items-center gap-5 mt-8">
                <button className="btn bg-white text-black"><LocalPrintshopOutlinedIcon /> Cetak QR Code</button>
                <button className="btn bg-white text-black"><EditOutlinedIcon /> Edit Detail Aset</button>
                <button
                    className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300">
                    <DeleteOutlineOutlinedIcon /> Delete Aset
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-7">
                <div className="bg-white w-full p-5 rounded-xl">
                    <div className="dropdown mb-2 sm:hidden">
                        <div tabIndex={0} role="button"><MoreHorizIcon /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-72 space-y-2">
                            <li><button className="btn bg-white text-black"><LocalPrintshopOutlinedIcon /> Cetak QR Code</button></li>
                            <li><button className="btn bg-white text-black"><EditOutlinedIcon /> Edit Detail Aset</button></li>
                            <li><button className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300"><DeleteOutlineOutlinedIcon /> Delete Aset</button></li>
                        </ul>
                    </div>
                    <div className='flex flex-col md:flex-row w-full gap-4'>
                        <img
                            alt="Aset"
                            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                            className="md:w-2/5 rounded-lg object-cover"
                        />
                        <h1 className='text-xl font-bold uppercase'>{data?.aset.nama_barang}</h1>
                    </div>
                    <div className='flex flex-row justify-between mt-4'>
                        <div className='space-y-2 w-[50%]'>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Merk</h3>
                                <p className=' text-gray-400'>{data?.aset.merk}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Tahun Perolehan</h3>
                                <p className=' text-gray-400'>{moment(data?.aset.tahun_perolehan).format("LL")}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Ruangan</h3>
                                <p className=' text-gray-400'>{data?.ruangan.nama_ruangan}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Status</h3>
                                <p className=' text-gray-400'>{data?.status}</p>
                            </div>
                        </div>
                        <div className='w-[50%]'>
                            <Image
                                alt="qrcode"
                                src={qrcode}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                    <h3 className='text-lg font-medium'>Notes</h3>
                    <p className=' text-gray-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nisl purus in mollis. Mi sit amet mauris commodo.
                        Mi tempus imperdiet nulla malesuada pellentesque elit.
                        A cras semper auctor neque vitae. </p>
                </div>
                <div className="space-y-5">
                    <div className='flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl '>
                        <Image src={profile}
                            className="w-full max-h-[300px] md:max-w-[200px] md:max-h-[200px] rounded-lg object-cover object-top" />
                        <div className='w-full space-y-2'>
                            <h2 className='text-lg font-medium'>John Doe</h2>
                            <p className='flex items-center justify-between text-sm font-medium'><span>NIP</span> 00123123806792 </p>
                            <p className='flex items-center justify-between text-sm font-medium'><span>Role</span> Staff </p>
                            <p className='flex items-center justify-between text-sm font-medium'><span>No Hp</span> 2011523003 </p>
                            <p className='flex items-center justify-between text-sm font-medium'><span>Alamat</span> Padang </p>
                            <p className='flex items-center justify-between text-sm font-medium'><span>Jenis Kelamin</span> Pria </p>
                        </div>
                    </div>
                    <div className='p-5 bg-white rounded-xl space-y-2'>
                        <h2 className='text-lg font-medium'>Riwayat Laporan kerusakan</h2>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm text-gray-500'>SSD Rusak</p>
                                <p className='text-sm text-gray-500'>12/01/2024</p>
                            </div>
                            <div>
                                <Link href={"/admin/laporan_kerusakan/123"} className='btn btn-sm bg-white'>View</Link>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm text-gray-500'>SSD Rusak</p>
                                <p className='text-sm text-gray-500'>12/01/2024</p>
                            </div>
                            <div>
                                <Link href={"/admin/laporan_kerusakan/123"} className='btn btn-sm bg-white'>View</Link>
                            </div>
                        </div>
                    </div>
                    <div className='p-5 bg-white rounded-xl space-y-2'>
                        <h2 className='text-lg font-medium'>Riwayat Laporan Perbaikan</h2>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm text-gray-500'>SSD Rusak</p>
                                <p className='text-sm text-gray-500'>12/01/2024</p>
                            </div>
                            <div>
                                <Link href={"/admin/laporan_perbaikan/123"} className='btn btn-sm bg-white'>View</Link>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm text-gray-500'>Kipas rusak, ganti thermal paste, dan pembersihan motherboard</p>
                                <p className='text-sm text-gray-500'>12/01/2024</p>
                            </div>
                            <div>
                                <Link href={"/admin/laporan_perbaikan/123"} className='btn btn-sm bg-white'>View</Link>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <div>
                                <p className='text-sm text-gray-500'>Kipas rusak, ganti thermal paste, dan pembersihan motherboard</p>
                                <p className='text-sm text-gray-500'>12/01/2024</p>
                            </div>
                            <div>
                                <Link href={"/admin/laporan_perbaikan/123"} className='btn btn-sm bg-white'>View</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page