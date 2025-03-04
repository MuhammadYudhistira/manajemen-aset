import EditLaporanKerusakanForm from "@/components/(form)/laporan_kerusakan/EditLaporanKerusakanForm";
import React from "react";

const page = ({ params }) => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <EditLaporanKerusakanForm id={params.id} />
            </div>
        </>
    );
};

export default page;
