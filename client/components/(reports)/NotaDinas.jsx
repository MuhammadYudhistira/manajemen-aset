"use client"
import { Button } from '@nextui-org/react'
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { formatRupiah } from '@/libs/formatRupiah';
import moment from 'moment';
import 'moment/locale/id';

const NotaDinas = ({ deskripsi_kerusakan, biaya_perbaikan, no_rekening, perihal, createdAt, hal, tanggal_laporan, nama, nip }) => {
    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: 'Nota Dinas',
        // This function allows you to add custom styles for printing
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
            <Button className='bg-white' variant='bordered' onClick={handlePrint}>
                <PictureAsPdfOutlinedIcon /> Export PDF
            </Button>
            <div className='rounded-xl bg-white p-5 mt-5 border'>
                <div ref={contentRef} className='p-5 space-y-5 print-container'>
                    <h1 className='font-bold text-center text-xl underline font-serif'>NOTA DINAS</h1>
                    <table className='text-left uppercase font-serif font-light w-full border-b-4 border-black border-double mb-4'>
                        <tbody>
                            <tr>
                                <td className='w-[10%]'>Kepada</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>Yth. Bapaka Sekretaris DPRD Provinsi Sumatera Barat</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Dari</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>Kepala Bagian Umum dan Keuangan Set. DPRD Sumbar</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Tanggal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{moment(createdAt).format("DD MMMM YYYY")}</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Hal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{hal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Dengan Hormat,</p>
                    <ol className='pl-10 list-decimal list-outside space-y-4'>
                        <li>Dengan ini disampaikan kepada Bapak, bahwa sesuai dengan laporan staf subbag rumah tangga Sekretariat DPRD Prov. Sumbar tanggal {moment(tanggal_laporan).format("DD MMMM YYYY")} Perihal {perihal}</li>
                        <li>{deskripsi_kerusakan} dengan biaya yang dibutuhkan sebesar <strong>{formatRupiah(biaya_perbaikan)}</strong></li>
                        <li>Untuk biaya diatas dibebankan pada kegiatan Penyediaan jasa penunjang Urusan Pemerintah Provinsi, dengan No Rekening <strong>{no_rekening}</strong></li>
                        <li>Demikian disampaikan dan selanjutnya mohon persetujuan Bapak, terimakasih.</li>
                    </ol>
                    <div className='flex justify-end uppercase'>
                        <div>
                            <h4 className='text-center'>Kepala bagian umum dan keuangan</h4>
                            <h4 className='text-center'>Sekretariat DPRD Prov. Sumbar</h4>
                            <br /><br /> <br />
                            <p className='text-center underline'>{nama}</p>
                            <p className='text-center'>NIP. {nip}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotaDinas;
