// ButtonLaporan.js
import { Button } from '@nextui-org/react';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import React from 'react';
import { useReactToPrint } from 'react-to-print';

const ButtonLaporan = ({ contentRef, nama_barang }) => {
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: `Laporan Kerusakan ${nama_barang}`,
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
        <Button className="btn bg-white text-black border border-black w-full md:w-auto" onClick={handlePrint}>
            <PictureAsPdfOutlinedIcon /> Download Laporan
        </Button>
    );
};

export default ButtonLaporan;
