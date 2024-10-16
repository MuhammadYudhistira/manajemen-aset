import React from "react";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const page = () => {
  return (
    <>
      {/* <button className="btn mt-6 bg-white text-black">
        <LocalPrintshopOutlinedIcon /> Cetak Laporan perbaikan
      </button> */}
      <div className="rounded-xl bg-white p-5">
        <div className="flex items-center justify-end gap-4">
          <p className="text-sm text-gray-400">ID Laporan : 1.22.12.211.1</p>
          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
            <CachedOutlinedIcon className="mr-1 text-sm" />
            <p className="whitespace-nowrap text-sm">Repairing</p>
          </span>
        </div>
        <form className="w-full space-y-2">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Aset</span>
            </div>
            <input
              type="text"
              placeholder="Aset"
              className="input bg-blue-50 text-black"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Deskripsi</span>
            </div>
            <textarea
              className="textarea h-24 bg-blue-50 text-black"
              placeholder="Deskripsi Kerusakan Aset"
            ></textarea>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Dokumentasi Perbaikan</span>
            </div>
            <div className="flex flex-col gap-3 overflow-x-auto md:flex-row">
              <img
                alt="Aset"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                className="max-h-[200px] rounded-lg object-cover md:max-w-[200px]"
              />
              <img
                alt="Aset"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                className="max-h-[200px] rounded-lg object-cover md:max-w-[200px]"
              />
              <img
                alt="Aset"
                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                className="max-h-[200px] rounded-lg object-cover md:max-w-[200px]"
              />
            </div>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Faktur</span>
            </div>
            <input
              type="text"
              placeholder="Faktur_1.23.13.311.1.pdf"
              className="input bg-blue-50 text-black"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Kuitansi</span>
            </div>
            <input
              type="text"
              placeholder="Kuitansi.23.13.311.1.pdf"
              className="input bg-blue-50 text-black"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Berita Acara</span>
            </div>
            <input
              type="text"
              placeholder="Berita_Acara.23.13.311.1.pdf"
              className="input bg-blue-50 text-black"
            />
          </label>
        </form>
      </div>
    </>
  );
};

export default page;
