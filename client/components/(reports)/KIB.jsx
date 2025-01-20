"use client"

import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import Image from "next/image";
import logo from "@/public/logo.png"
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import moment from "moment";
import { Spinner } from "@nextui-org/react";
import { useFetchActiveDA } from "@/hooks/detail_aset/useFetchActiveDA";
import { formatRupiah } from "@/libs/formatRupiah";

const KIB = () => {

    const { data, isLoading } = useFetchActiveDA();

    const totalNilaiPerolehan = data?.reduce((total, item) => {
        return total + item.aset.nilai_perolehan;
    }, 0);

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

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <button onClick={handlePrint} className="btn bg-white text-black">
                <LocalPrintshopOutlinedIcon /> Cetak KIB
            </button>
            <div className="bg-white w-0 h-0 overflow-hidden">
                <div ref={contentRef} className='p-1 print-container'>
                    <div className="grid grid-cols-3 mt-3">
                        <Image src={logo} width={60} height={60} />
                        <div>
                            <h1 className="text-center text-[1.2rem] font-bold uppercase">Kartu Inventaris Barang</h1>
                            <h2 className="text-center text-[1.2rem] font-bold uppercase">KIB B (Peralatan dan Mesin)</h2>
                        </div>
                    </div>
                    <div className="uppercase font-bold text-sm mt-3">
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
                    <table className="table-auto border border-black w-full text-sm font-semibold uppercase mt-3">
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
                            {data?.length > 0 && data?.map((aset, index) => {
                                return (
                                    <tr className={`px-4 text-xs text-left ${index % 2 !== 0 ? 'bg-gray-300' : ''}`} key={aset.id}>
                                        <td className="border border-black text-center whitespace-nowrap">{index + 1}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.kode_barang}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.aset.nama_barang}</td>
                                        <td className="border border-black text-center w-10">{moment(aset.tahun_perolehan).format("YYYY")}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.merk}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset.ukuran || "-"}</td>
                                        <td className="border border-black pr-2 text-right whitespace-nowrap">{aset.harga_satuan}</td>
                                        <td className="border border-black text-center w-10">{aset.jumlah_barang}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset?.Aset_Kendaraan?.nomor_rangka || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset?.Aset_Kendaraan?.nomor_mesin || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset?.Aset_Kendaraan?.nomor_polisi || "-"}</td>
                                        <td className="border border-black pl-2 whitespace-nowrap">{aset?.Aset_Kendaraan?.nomor_bpkb || "-"}</td>
                                        <td className="border border-black pr-2 text-right whitespace-nowrap">{aset.harga_satuan}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="mt-6">
                        <table>
                            <tr className="text-blue-500 px-4 text-xs">
                                <td className=" border-black font-bold border text-xs text-left py-1 pr-[58px] pl-2">NILAI PEROLEHAN</td>
                                <td className=" border-black font-bold border text-xs text-right py-1 pl-10 pr-2">{formatRupiah(totalNilaiPerolehan)}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="flex justify-around items-center font-bold mt-12">
                        <div className="text-center">
                            <h3>MENGETAHUI</h3>
                            <p>Sekretaris DPRD Provinsi Sumatera Barat</p>
                            <p className="mt-16">( H. RAFLIS, SH, MM ) </p>
                            <p>NIP. 19640930 198602 1 002</p>
                        </div>
                        <div className="text-center">
                            <h3>Padang, {moment(new Date()).format("DD MMMM YYYY")}</h3>
                            <p>PENGURUS BARANG</p>
                            <p className="mt-16">( NEFRIANDI, SH, MM ) </p>
                            <p>NIP. 19781122 201001 1 004</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KIB