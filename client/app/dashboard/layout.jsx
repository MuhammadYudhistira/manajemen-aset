import React from 'react'
import Header from '@/components/(layout)/Header'
import Sidebar from '@/components/(layout)/Sidebar'

const layout = ({ children }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-[#EFF4F8] w-full">
                <Header />
                <main className='w-[95%] mx-auto mt-4 space-y-4'>
                    {children}
                </main>
            </div>
            <Sidebar />
        </div>
    )
}

export default layout