import React from 'react'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';


const page = () => {
    return (
        <>
            <button className="btn bg-white text-black mt-6"><LocalPrintshopOutlinedIcon /> Cetak Laporan Kerusakan</button>
            <div className='p-5 bg-white rounded-xl'>
                <div className='flex justify-end items-center gap-4'>
                    <p className='text-sm text-gray-400'>ID Laporan : 1.22.12.211.1</p>
                    <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="whitespace-nowrap text-sm">Accepted</p>
                    </span>
                </div>
                <form className='w-full space-y-2'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Pelapor</span>
                        </div>
                        <input type="text" placeholder="Pelapor" className="input bg-blue-50 text-black" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Aset</span>
                        </div>
                        <input type="text" placeholder="Aset" className="input bg-blue-50 text-black" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Deskripsi</span>
                        </div>
                        <textarea className="textarea h-24 bg-blue-50 text-black" placeholder="Deskripsi Kerusakan Aset"></textarea>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Dokumentasi kerusakan</span>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 overflow-x-auto'>
                            <img
                                alt="Aset"
                                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                                className="md:max-w-[200px] max-h-[200px] rounded-lg object-cover"
                            />
                            <img
                                alt="Aset"
                                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                                className="md:max-w-[200px] max-h-[200px] rounded-lg object-cover"
                            />
                            <img
                                alt="Aset"
                                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                                className="md:max-w-[200px] max-h-[200px] rounded-lg object-cover"
                            />
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Disetujui Oleh</span>
                        </div>
                        <input type="text" placeholder="Disetujui Oleh" className="input bg-blue-50 text-black" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Disetujui Tanggal</span>
                        </div>
                        <input type="text" placeholder="Disetujui Tanggal" className="input bg-blue-50 text-black" />
                    </label>
                </form>
            </div>
        </>
    )
}

export default page