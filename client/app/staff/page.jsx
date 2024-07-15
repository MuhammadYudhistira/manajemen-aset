import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import StatsAset from "@/components/(aset)/StatsAset";
import Link from "next/link";
import GridAsetStaff from "./GridAsetStaff";

const page = () => {
  return (
    <>
      <StatsAset />
      <div className="flex gap-4">
        <div className="flex w-full flex-1 flex-col gap-4 lg:flex-row">
          <input
            type="text"
            placeholder="Nama Aset"
            className="input input-md input-bordered w-full lg:max-w-xs"
          />
          <select className="select select-bordered w-full lg:max-w-xs">
            <option>Terbaru</option>
            <option>Terlama</option>
          </select>
          <button className="btn btn-neutral bg-black text-white">
            <SearchOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        <GridAsetStaff />
      </div>
    </>
  );
};

export default page;
