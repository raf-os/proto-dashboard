'use client';

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function NavbarLink({ label, linkref, icon } : {label: string, linkref: string, icon?: string}) {
    const pathname = usePathname();

    return (
        <Link href={linkref}>
            <li className={clsx(
                    "flex flex-row items-center px-2 py-1 text-lg font-bold rounded-md hover:text-yellow-400",
                    { "bg-white/20": pathname === linkref }
                )}>
                { label }
            </li>
        </Link>
    )
}
