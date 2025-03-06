"use client"
import {
    Button,
} from "@nextui-org/react";
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { formatRupiah } from '@/libs/formatRupiah';
import moment from 'moment';
import 'moment/locale/id';

const PemusnahanAset = ({ asets, title, createdAt }) => {
    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: `${title}`,
        onBeforeGetContent: () => {
            const style = document.createElement('style');
            style.innerHTML = `
                @page {
                    size: A4;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    .print-container {
                        padding: 20mm;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });

    return (
        <>
            <div className="mt-8 items-center justify-end gap-3 flex flex-col md:flex-row">
                <Button className="btn bg-white text-black border border-black w-full md:w-auto" onClick={handlePrint}>
                    <PictureAsPdfOutlinedIcon /> Print Laporan
                </Button>
            </div>
            <div className='bg-white w-0 h-0 overflow-hidden '>
                <div ref={contentRef} className='p-5 space-y-5 print-container'>
                    <h1 className='font-bold text-center text-xl underline font-serif'>LAPORAN PEMUSNAHAN ASET</h1>
                    <table className='text-left uppercase font-serif font-light w-full mb-4'>
                        <tbody>
                            <tr>
                                <td className='w-[10%]'>Tanggal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{moment(createdAt).format("DD MMMM YYYY")}</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Hal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{title}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='text-xs uppercase w-full border-collapse border border-black'>
                        <thead className="border-collapse border border-black">
                            <th className="border-collapse border border-black">Kode Barang</th>
                            <th className="border-collapse border border-black">Nama Aset</th>
                            <th className="border-collapse border border-black">Tanggal Perolehan</th>
                            <th className="border-collapse border border-black">Harga Perolehan</th>
                        </thead>
                        <tbody className="border-collapse border border-black">
                            {asets?.map((aset) => {
                                return (
                                    <tr key={aset.id}>
                                        <td className="whitespace-nowrap px-4 font-medium text-gray-900 border-collapse border border-black">
                                            {aset.detail_pengadaan.id}
                                        </td>
                                        <td className="whitespace-nowrap px-4 font-medium text-gray-900 border-collapse border border-black">
                                            {aset.detail_pengadaan.barang.nama_barang}
                                        </td>
                                        <td className="whitespace-nowrap px-4 font-medium text-center text-gray-900 border-collapse border border-black">
                                            {moment(aset?.detail_pengadaan?.pengadaan?.tanggal_penerimaan).format("DD MMMM YYYY")}
                                        </td>
                                        <td className="whitespace-nowrap px-4 font-medium text-gray-900 border-collapse border border-black">
                                            {formatRupiah(aset.detail_pengadaan.harga_satuan)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <div className='flex justify-end uppercase text-xs font-medium'>
                        <div>
                            <p className='text-center'>Padang, {moment(createdAt).format("DD MMMM YYYY")}</p>
                            <br /><br /> <br />
                            <h4 className='text-center'>Kepala bagian umum dan keuangan</h4>
                            <h4 className='text-center'>Sekretariat DPRD Prov. Sumbar</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PemusnahanAset;
