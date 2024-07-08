import AreaCharts from "@/components/(charts)/AreaChart";
import BarCharts from "@/components/(charts)/BarCharts";

const page = () => {
  return (
    <>
      <section className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <div>
            <p className="text-2xl font-medium text-gray-900">
              Rp 50.000.000.000
            </p>
            <p className="text-sm text-gray-500">Nilai Aset</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">3.000</p>

            <p className="text-sm text-gray-500">Total Aset</p>
          </div>
        </article>
        <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
          <span className="rounded-full bg-blue-50 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>

          <div>
            <p className="text-2xl font-medium text-gray-900">130</p>

            <p className="text-sm text-gray-500">Total User</p>
          </div>
        </article>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="flex w-full flex-col rounded-xl border bg-white p-5 lg:col-span-2">
          <h3 className="font-bold">Nilai Aset</h3>
          <AreaCharts />
        </div>
        <div className="w-full space-y-5 rounded-xl border bg-white p-5">
          <h3>Aset Terbaru</h3>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Macbook Pro 14" 2024
              </h3>
              <p className="mt-0.5 text-gray-400">12 Januari 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Macbook Pro 14" 2024
              </h3>
              <p className="mt-0.5 text-gray-400">12 Januari 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Macbook Pro 14" 2024
              </h3>
              <p className="mt-0.5 text-gray-400">12 Januari 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Macbook Pro 14" 2024
              </h3>
              <p className="mt-0.5 text-gray-400">12 Januari 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Macbook Pro 14" 2024
              </h3>
              <p className="mt-0.5 text-gray-400">12 Januari 2024</p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="w-full space-y-5 rounded-xl border bg-white p-5">
          <h3>Aset Terbaru</h3>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Daniel
              </h3>

              <p className="mt-0.5 text-gray-700">Sekretaris</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Daniel
              </h3>

              <p className="mt-0.5 text-gray-700">Sekretaris</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="size-12 rounded-full object-cover"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                Daniel
              </h3>

              <p className="mt-0.5 text-gray-700">Sekretaris</p>
            </div>
          </div>
        </div>
        <div className="w-full rounded-xl border bg-white p-5 lg:col-span-2">
          <h3 className="mb-0 p-0 font-bold">Jumlah Aset</h3>
          <BarCharts />
        </div>
      </section>
    </>
  );
};

export default page;
