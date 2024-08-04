"use client"

import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import Image from "next/image";
import logo from "@/public/logo.png"

import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import { useFetchListDA } from "@/hooks/detail_aset/useFetchListDA";
import moment from "moment";

const KIB = () => {

    const { data, isLoading } = useFetchListDA();
    console.log("🚀 ~ KIB ~ data:", data)

    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: `KIB ${new Date()}`,
        //add custom styles for printing
        onBeforeGetContent: () => {
            const style = document.createElement('style');
            style.innerHTML = `
            @page {
                size: A3 landscape;
                margin: 0;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                }
                .print-container {
                    padding: 10mm;
                    margin: 0;
                }
            }
        `;
            document.head.appendChild(style);
        }
    });

    return (
        <div>
            <button onClick={handlePrint} className="btn bg-white text-black">
                <LocalPrintshopOutlinedIcon /> Cetak KIB
            </button>
            <div className="bg-white w-0 h-0 overflow-hidden">
                <div ref={contentRef} className='p-1 space-y-3 print-container'>
                    <div className="grid grid-cols-3">
                        <Image src={logo} width={60} height={60} />
                        <div>
                            <h1 className="text-center text-[1.2rem] font-bold uppercase">Kartu Inventaris Barang</h1>
                            <h2 className="text-center text-[1.2rem] font-bold uppercase">KIB B (Peralatan dan Mesin)</h2>
                        </div>
                    </div>
                    <div className="uppercase font-bold text-sm">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Provinsi</td>
                                    <td className="w-10"></td>
                                    <td>: </td>
                                    <td className="w-2"></td>
                                    <td> Sumatera Barat</td>
                                </tr>
                                <tr>
                                    <td>Unit Bidang</td>
                                    <td className="w-10"></td>
                                    <td>: </td>
                                    <td className="w-2"></td>
                                    <td> Sekretariat DPRD</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-end uppercase font-bold text-sm">
                        <p>KODE LOKASI : 11.01.13.00.400021.00000.00000.XXXX</p>
                    </div>
                    <table className="table-auto border border-black w-full text-sm font-semibold uppercase">
                        <thead>
                            <tr className="px-4 text-xs">
                                <th className="uppercase font-medium border border-black px-4">
                                    NO.
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Kode Barang
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nama Barang
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Tahun perolehan
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Merk/Model
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Ukuran
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Harga Satuan
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Jumlah Barang
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nomor Rangka
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nomor Mesin
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nomor Polisi
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nomor BPKB
                                </th>
                                <th className="uppercase font-medium border border-black px-4">
                                    Nilai Perolehan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((aset, index) => {
                                return (
                                    <tr className={`px-4 text-xs text-left ${index % 2 !== 0 ? 'bg-gray-300' : ''}`} key={aset.id}>
                                        <td className="border border-black text-center whitespace-nowrap">{index + 1}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.kode_barang}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.aset.nama_barang}</td>
                                        <td className="border border-black text-center w-10">{moment(aset.aset.tahun_perolehan).format("YYYY")}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.aset.merk}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.aset.ukuran || "-"}</td>
                                        <td className="border border-black pr-2 text-right whitespace-nowrap">{aset.aset.harga_satuan}</td>
                                        <td className="border border-black text-center w-10">{aset.aset.jumlah_barang}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.nomor_rangka || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.nomor_mesin || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.nomor_polisi || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.nomor_bpkb || "-"}</td>
                                        <td className="border border-black pr-2 text-right whitespace-nowrap">{aset.aset.nilai_perolehan}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default KIB