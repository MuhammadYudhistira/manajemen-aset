"use client"
import React from 'react'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import qrcode from "@/public/qrcode.png"
import Image from "next/legacy/image";
import Link from 'next/link';
import { useFetchDA } from '@/hooks/detail_aset/useFetchDA';
import { Spinner } from '@nextui-org/react';

const page = ({ params }) => {

    const { data, isLoading } = useFetchDA(params.id, params.iddetail)

    if (isLoading) {
        return <Spinner />
    }

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
                    <div className='flex flex-row w-full gap-8'>
                        <Image
                            alt="Aset"
                            src={data?.Detail_Aset_Images ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.Detail_Aset_Images[0]?.link}` : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${null}`}
                            width={300}
                            height={100}
                            className="md:w-2/5 rounded-lg object-cover"
                        />
                        <div className='space-y-2'>
                            <h1 className='text-xl font-bold uppercase'>{data?.aset?.nama_barang}</h1>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Merk</h3>
                                <p className=' text-gray-400'>{data?.aset?.merk}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Kode Barang</h3>
                                <p className=' text-gray-400'>{data?.kode_barang}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Ruangan</h3>
                                <p className=' text-gray-400'>{data?.ruangan?.nama_ruangan}</p>
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Status</h3>
                                <p className=' text-gray-400'>{data?.status}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-between mt-4'>
                        <div className='space-y-2 w-[50%]'>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Nomor Rangka</h3>
                                {data?.nomor_rangka ? (
                                    <p className=' text-gray-400'>{data?.nomor_rangka}</p>
                                ) : "-"}
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Nomor Mesin</h3>
                                {data?.nomor_mesin ? (
                                    <p className=' text-gray-400'>{data?.nomor_mesin}</p>
                                ) : "-"}
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Nomor Polisi</h3>
                                {data?.nomor_polisi ? (
                                    <p className=' text-gray-400'>{data?.nomor_polisi}</p>
                                ) : "-"}
                            </div>
                            <div className='space-y-2'>
                                <h3 className='text-lg font-medium'>Nomor bpkb</h3>
                                {data?.nomor_bpkb ? (
                                    <p className=' text-gray-400'>{data?.nomor_bpkb}</p>
                                ) : "-"}
                            </div>
                        </div>
                        <div className='w-[50%]'>
                            <Image
                                alt="qrcode"
                                src={qrcode}
                                className="w-full rounded-lg object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h3 className='text-lg font-medium mt-4'>Keterangan</h3>
                    <p className=' text-gray-400'>{data?.keterangan ? data?.keterangan : "-"}</p>
                </div>
                <div className="space-y-5">
                    <div className='flex flex-col md:flex-row gap-5 p-5 bg-white rounded-xl '>
                        {data?.Penanggung_Jawab?.length > 0 ? (
                            <>
                                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.Penanggung_Jawab[0]?.image}`} alt='profile' width={200} height={200} className="w-full rounded-lg object-cover object-center" />
                                <div className='w-full space-y-2'>
                                    <h2 className='text-lg font-medium'>{data?.Penanggung_Jawab[0]?.nama}</h2>
                                    <p className='flex items-center justify-between text-sm font-medium'><span>NIP</span> {data?.Penanggung_Jawab[0]?.nip} </p>
                                    <p className='flex items-center justify-between text-sm font-medium'><span>Role</span> {data?.Penanggung_Jawab[0]?.role} </p>
                                    <p className='flex items-center justify-between text-sm font-medium'><span>No Hp</span> {data?.Penanggung_Jawab[0]?.no_hp} </p>
                                    <p className='flex justify-between text-sm font-medium'>Alamat <span className='ml-10 flex-grow text-right'>{data?.Penanggung_Jawab[0]?.alamat} </span></p>
                                </div>
                            </>
                        ) : (<p>Belum ada Penanggung Jawab</p>)}

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