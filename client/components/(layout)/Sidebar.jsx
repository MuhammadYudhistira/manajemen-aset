import Image from 'next/image'
import Link from 'next/link'
import logo from '../../app/icon.svg'

const Layout = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-full bg-white text-base-content border">
                <li><Link href={"/"} className='text-lg font-bold'> <Image src={logo} alt='logo' width={30} />DPRD SUMBAR</Link></li>
                <div className="divider mt-0"></div>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li>
                    <details>
                        <summary class="group">Aset</summary>
                        <ul className="bg-slate-50 rounded-xl">
                            <li><Link href="/dashboard/detail-aset" class="group"> <span>Detail Aset</span></Link></li>
                            <li><Link href="/dashboard/detail-aset" class="group"> <span>Detail Aset</span></Link></li>
                            <li><Link href="/dashboard/detail-aset" class="group"> <span>Detail Aset</span></Link></li>
                            <li><Link href="/dashboard/detail-aset" class="group"> <span>Detail Aset</span></Link></li>
                        </ul>
                    </details>
                </li>
                <li>
                    <details>
                        <summary class="group">Staff</summary>
                        <ul className="bg-slate-50 rounded-xl">
                            <li><a href="/detail-aset" class="group"> <span>Detail Aset</span></a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    )
}

export default Layout