import React from 'react'
import { assets } from '../../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { Users, MessageSquare, Bell, HomeIcon, BookOpenText, MessageSquareIcon } from "lucide-react";
export const Sidenav = () => {
    return (
        <>
            <div className='flex flex-col h-full w-auto fixed bg-[#333] '>
                <div className='flex px-8 mx-6 my-5'>
                    <img src={assets.learnovalogo} alt="Learnova Logo" className="h-16 hover:cursor-pointer " />
                </div>
                <div className='flex flex-col gap-2 mx-2 my-1'>
                    <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
                        ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                    }>
                        <HomeIcon />
                        <span> Home</span>
                    </NavLink>
                    <NavLink to="/classroom" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
                         ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                    }>
                        <BookOpenText />
                        <span> Classroom</span>
                    </NavLink>
                    <NavLink to="/community" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
                         ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                    }>
                        <Users />
                        <span> Community</span>
                    </NavLink>

                    <NavLink to="/messages" className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
                         ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                    }>
                        <MessageSquareIcon />
                        <span> Messages</span>
                    </NavLink>
                    <NavLink to="/Notification" className={({ isActive }) =>
                        `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors 
                            ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                    }>
                        <Bell />
                        <span> Notifications</span>
                    </NavLink>

                </div>
            </div>
        </>
    )
}

// export default Sidenav