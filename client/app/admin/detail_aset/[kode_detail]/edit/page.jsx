import EditDetailAsetForm from "@/components/(form)/detail_aset/EditDetailAsetForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="rounded-xl bg-white p-5">
      <EditDetailAsetForm kode_detail={params.kode_detail} />
    </div>
  );
};

export default page;
