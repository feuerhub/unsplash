'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image';
import logo from '../../assets/images/Logo.svg';

export function Header() {
    const pathname = usePathname();
    const links = [{path: '/', name: 'Home'}, {path: '/collections', name: 'Collections'}]
    return (
        <header className="h-16 px-9 border-b border-light-gray flex justify-between items-center">
            <div>
                <Image src={logo} alt='Logo' />
            </div>
            <nav>
                <ul className="flex gap-2">
                    {links.map((link, index) => 
                    <li key={index}>
                        <a href={link.path} className={pathname == link.path ? 'px-6 py-3 text-sm rounded text-black-color bg-light-gray-color' : 'px-6 py-3 text-sm text-gray-color'}>{link.name}</a>
                    </li>)}
                </ul>
            </nav>
        </header>
    )
}