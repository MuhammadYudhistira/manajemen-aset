import React from 'react'
import HeaderTitle from './HeaderTitle'

const Header = () => {


    return (
        <header className='w-[95%] mt-2 bg-white mx-auto sticky top-0 z-10 rounded-xl border'>
            <div className="navbar bg-white rounded-xl">
                <label htmlFor='my-drawer-2' className="btn btn-square btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
                {/* <HeaderTitle /> */}
                <div className="flex-1">
                    <h2 className="btn btn-ghost text-xl">SIMAS</h2>
                </div>
                <div className="flex-none gap-2">
                    <p className='font-medium'>Admin</p>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Profile</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header