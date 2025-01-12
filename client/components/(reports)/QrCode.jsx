"use client"

import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import Image from "next/image";
import logo from "@/public/logo.png"

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';

const QrCode = ({ ruangan, id, aset, kode_barang, tahun }) => {

    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: `QR Code ${aset}`,
        //add custom styles for printing
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
        <div>
            <button onClick={handlePrint} className=" btn bg-white text-black overflow-hidden">
                <LocalPrintshopOutlinedIcon /> Cetak QR Code
            </button>
            <div className="bg-white w-0 h-0 overflow-hidden">
                <div ref={contentRef} className='p-5 space-y-5 print-container'>
                    <table className="border border-black w-full text-sm font-semibold uppercase">
                        <thead>
                            <tr className="px-4">
                                <th className="uppercase font-medium border border-black px-4" colSpan={3}>
                                    Barang milik daerah provinsi sumatera barat
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="px-4 text-center">
                                <td className="border border-black px-4">Nama Objek/Aset</td>
                                <td className="border border-black px-4 text-sm">Kantor DPRD Provinsi Sumatera Barat</td>
                                <td className="border border-black px-4"></td>
                            </tr>
                            <tr className="p-4 text-center">
                                <td className="border border-black px-4">Nama Ruangan</td>
                                <td className="border border-black px-4 text-sm">{ruangan}</td>
                                <td className="border border-black px-4"></td>
                            </tr>
                            <tr className="p-4">
                                <td className="border border-black p-4">
                                    <Image src={logo} width={125} height={125} />
                                </td>
                                <td className="border border-black p-0">
                                    <table className="w-full h-full uppercase text-sm text-center font-semibold">
                                        <tbody>
                                            <tr className="p-0"><td className="border-y border-black h-6 p-0">{aset}</td></tr>
                                            <tr className="p-0"><td className="border-y border-black h-6 p-0">Kode Barang</td></tr>
                                            <tr className="p-0"><td className="border-y border-black h-6 p-0">{kode_barang}</td></tr>
                                            <tr className="p-0"><td className="border-y border-black h-6 p-0">Tahun {tahun}</td></tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td className="border border-black p-4">
                                    <img
                                        alt="qrcode"
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=125x125&data=${[process.env.NEXT_PUBLIC_QR_URL]}${id}`}
                                        className="rounded-lg object-cover"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}

export default QrCode