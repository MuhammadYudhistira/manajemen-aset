import EditUserForm from "@/components/(form)/user/EditUserForm";
import React from "react";

const page = ({ params }) => {
  return (
    <div className="rounded-xl bg-white p-5">
      <EditUserForm id={params.id} />
    </div>
  );
};

export default page;
