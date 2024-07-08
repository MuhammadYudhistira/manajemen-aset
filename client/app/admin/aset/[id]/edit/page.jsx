import EditAsetForm from "@/components/(form)/EditAsetForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="rounded-xl bg-white p-5">
      <EditAsetForm id={params.id} />
    </div>
  );
};

export default page;
