import React from "react";
import HeaderAvatar from "./HeaderAvatar";
import QRScanner from "../(global)/Scanner";
import { Link } from "next-view-transitions";
import Search from "./Search";


const Header = ({ role }) => {
  return (
    <header className="sticky top-0 z-10 mx-auto mt-2 w-[95%] rounded-xl border bg-white">
      <div className="navbar rounded-xl bg-white">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-square btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <div className="flex-1 space-x-2">
          <Link href={"/"} className="btn btn-ghost text-xl">SIMAS</Link>
          <QRScanner />
          {role !== "staff" && <Search />}
        </div>
        <HeaderAvatar role={role} />
      </div>
    </header>
  );
};

export default Header;
