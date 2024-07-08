import CreateRuanganForm from "@/components/(form)/Ruangan/CreateRuanganForm";
import TableRuangan from "@/components/(table)/TableRuangan";
import React from "react";

const page = () => {
  return (
    <>
      <div className="mt-8 flex gap-4">
        <div className="ml-auto">
          <CreateRuanganForm />
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-white p-5">
        <TableRuangan />
      </div>
    </>
  );
};

export default page;
