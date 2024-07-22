import React from "react";
import Header from "@/components/(layout)/Header";
import SidebarStaff from "@/components/(layout)/staff/SidebarStaff";
import Sidebar from "@/components/(layout)/Sidebar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const layout = ({ children }) => {

    const cookieStore = cookies()
    const token = cookieStore.get('token')
    const decoded = jwtDecode(token.value)
    const role = decoded.role

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-h-screen w-full bg-[#EFF4F8]">
                <Header role={role.toLowerCase()} />
                <main className="mx-auto mb-5 mt-4 w-[95%] space-y-5">{children}</main>
            </div>
            {role === "ADMIN" && <Sidebar />}
            {role === "STAFF" && <SidebarStaff />}
        </div>
    );
};

export default layout;
