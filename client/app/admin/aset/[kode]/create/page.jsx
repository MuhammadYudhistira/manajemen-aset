import CreateDetailAsetForm from "@/components/(form)/detail_aset/CreateDetailAsetForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="rounded-xl bg-white p-5">
      <CreateDetailAsetForm id={params.kode} />
    </div>
  );
};

export default page;
