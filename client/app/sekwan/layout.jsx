import React from "react";
import Header from "@/components/(layout)/Header";
import SidebarSekwan from "@/components/(layout)/sekwan/SidebarSekwan";

const layout = ({ children }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-h-screen w-full bg-[#EFF4F8]">
                <Header role={"sekwan"} />
                <main className="mx-auto mb-5 mt-4 w-[95%] space-y-5">{children}</main>
            </div>
            <SidebarSekwan />
        </div>
    );
};

export default layout;
