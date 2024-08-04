import React from "react";
import LaporanPerbaikan from '@/components/(page)/LaporanPerbaikan';

const page = ({ params }) => {

    return (
        <>
            <LaporanPerbaikan id={params.id} />
        </>
    );
};

export default page;
