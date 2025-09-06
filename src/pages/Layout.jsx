import React from 'react'
import { Outlet } from "react-router-dom";
import {Sidenav} from '../components/shared/Sidenav'

export default function Layout({children}) {
    return (
        <div className="flex h-screen">
            {/* Permanent sidebar */}
            <Sidenav />

            {/* Main content area */}
            <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
                {children ||<Outlet />}
            </main>
        </div>
    )
}

