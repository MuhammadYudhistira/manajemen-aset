import React from "react";
import Header from "@/components/(layout)/Header";
import Sidebar from "@/components/(layout)/Sidebar";

const layout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full bg-[#EFF4F8]">
        <Header />
        <main className="mx-auto mb-5 mt-4 w-[95%] space-y-5 md:mb-0">
          {children}
        </main>
      </div>
      <Sidebar />
    </div>
  );
};

export default layout;
