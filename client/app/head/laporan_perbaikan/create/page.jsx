import CreateLaporanPerbaikanForm from "@/components/(form)/laporan_perbaikan/CreateLaporanPerbaikanForm";
import React from "react";

const page = ({ params }) => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <CreateLaporanPerbaikanForm/>
            </div>
        </>
    );
};

export default page;
