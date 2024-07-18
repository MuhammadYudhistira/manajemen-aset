import CreateLaporanKerusakanForm from "@/components/(form)/laporan_kerusakan/CreateLaporanKerusakanForm";
import React from "react";

const page = ({ params }) => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <CreateLaporanKerusakanForm id={params.id} />
            </div>
        </>
    );
};

export default page;
