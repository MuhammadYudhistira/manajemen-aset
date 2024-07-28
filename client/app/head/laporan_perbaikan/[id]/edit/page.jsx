import EditLaporanPerbaikanForm from "@/components/(form)/laporan_perbaikan/EditLaporanPerbaikanForm";
import React from "react";

const page = ({ params }) => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <EditLaporanPerbaikanForm id={params.id} />
            </div>
        </>
    );
};

export default page;
