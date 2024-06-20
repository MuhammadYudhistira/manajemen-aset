import React from 'react'

const page = () => {
    return (
        <>
            <div className='p-5 bg-white rounded-xl'>
                <form className='w-full space-y-2'>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nama Lengkap</span>
                        </div>
                        <input type="text" placeholder="Nama Lengkap" className="input bg-blue-50 text-black text-sm" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">NIP</span>
                        </div>
                        <input type="text" placeholder="NIP" className="input bg-blue-50 text-black text-sm" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Jenis Kelamin</span>
                        </div>
                        <select className="select bg-blue-50 text-sm">
                            <option>Pria</option>
                            <option>Wanita</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Foto Profil</span>
                        </div>
                        <div className='flex flex-col md:flex-row gap-3 overflow-x-auto'>
                            <img
                                alt="Aset"
                                src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
                                className="md:max-w-[200px] max-h-[200px] rounded-lg object-cover"
                            />
                        </div>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Alamat</span>
                        </div>
                        <input type="text" placeholder="Alamat" className="input bg-blue-50 text-black text-sm" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nomor Hp</span>
                        </div>
                        <input type="text" placeholder="Nomor Hp" className="input bg-blue-50 text-black text-sm" />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select className="select bg-blue-50 text-sm">
                            <option>Admin</option>
                            <option>Sekretaris</option>
                            <option>Kepala Bagian</option>
                            <option>Staff</option>
                        </select>
                    </label>
                    <div className="flex justify-end">
                        <button className="btn btn-sm mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black">Tambah user</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default page