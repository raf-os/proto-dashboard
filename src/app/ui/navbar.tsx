'use client';

import Link from "next/link";
import type { DashboardRoute } from "@/lib/defs";
import { auth } from "@root/auth";
import NavbarLink from "@/ui/navbar-link";

export default function Navbar() {
    const routes: DashboardRoute[] = [
        {
            id: 0,
            name: 'Conversas',
            route: '/dashboard/chat-list'
        }, {
            id: 1,
            name: 'Preferências',
            route: '/dashboard/user-prefs'
        }
    ]

    return (
        <div className="flex flex-col justify-start sidenav">
            <div className="p-4 flex-none">
                <Link href="/dashboard" className="text-3xl font-bold">Dashboard</Link>
            </div>

            <ul className="flex flex-col basis-full flex-wrap w-full px-4 gap-2">
            {routes.map((route) => (
                <NavbarLink key={route.id} label={route.name} linkref={route.route} icon={route.icon} />
            ))}
            </ul>
        </div>
    );
}