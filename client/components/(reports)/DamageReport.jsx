import React, { forwardRef } from 'react';
import moment from 'moment';
import 'moment/locale/id';

const DamageReport = forwardRef(({ nama_barang, nama, createdAt, deskripsi_kerusakan, perihal, ruangan }, ref) => (
    <div className='rounded-xl bg-white p-5 mt-5 border'>
        <div ref={ref} className='p-5 print-container'>
            <h1 className='font-bold text-left text-xl underline mb-10'>Laporan Staf</h1>
            <div className='grid grid-cols-2 gap-10'>
                <div className='place-content-center'>
                    Perihal : {perihal}
                </div>
                <div className='space-y-5'>
                    <p>Padang, {moment(createdAt).format("DD MMMM YYYY")}</p>
                    <div>
                        <p>Kepada:</p>
                        <p>Yth. Kepala Bagian Umum Subag Rumah Tangga Set. DPRD Prov.Sumbar</p>
                    </div>
                    <p>Di Tempat</p>
                </div>
            </div>
            <div className='mt-5'>
                <p>Dengan Hormat,</p>
                <p className='first-letter:ml-6 mt-2 text-justify'>Dengan ini Kami sampaikan kepada Bapak, bahwa {nama_barang} yang terdapat pada ruangan {ruangan} kantor DPRD Provinsi Sumatera Barat mengalami kerusakan. Perangkat ini berperan penting sebagai penunjang operasional di kantor DPRD.</p>
            </div>
            <div className='mt-5'>
                <p className='first-letter:ml-6 text-justify'>{deskripsi_kerusakan}, untuk itu perlu kami informasikan kepada Bapak tindak lanjut berikutnya.</p>
            </div>
            <div className='mt-5'>
                <p className='first-letter:ml-6 text-justify'>Demikian laporan kerusakan ini kami sampaikan kepada Bapak, dan terimakasih</p>
            </div>
            <div className='flex justify-end mt-7'>
                <div>
                    <h4 className='text-center'>Staf Subbag Rumah Tangga</h4>
                    <br /><br /> <br />
                    <p className='text-center underline'>{nama}</p>
                </div>
            </div>
        </div>
    </div>
));

export default DamageReport;