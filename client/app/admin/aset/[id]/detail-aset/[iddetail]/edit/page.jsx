import EditDetailAsetForm from "@/components/(form)/detail_aset/EditDetailAsetForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="rounded-xl bg-white p-5">
      <EditDetailAsetForm id={params.id} iddetail={params.iddetail} />
    </div>
  );
};

export default page;
