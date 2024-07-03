import CreateRuanganForm from "@/components/(form)/Ruangan/CreateRuanganForm";
import TableRuangan from "@/components/(table)/TableRuangan";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex gap-4 mt-8">
        <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full justify-end">
          <CreateRuanganForm />
        </div>
      </div>

      <div className="mt-4 p-5 rounded-xl bg-white border">
        <TableRuangan />
      </div>
    </>
  );
};

export default page;
