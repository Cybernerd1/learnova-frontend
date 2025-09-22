import React, { useState } from 'react'
import { assets } from '../../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { Users, Settings, Bell, HomeIcon, BookOpenText, MessageSquareIcon, LogOut, X } from "lucide-react";
import api from '../../services/api.js';
import { toast } from 'react-toastify';

export const Sidenav = () => {
    const navigate = useNavigate();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutPopup(true);
    };

    const handleConfirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            await api.post("/api/auth/logout", {}, { withCredentials: true });
            // Simulate logout process
            setTimeout(() => {
                setIsLoggingOut(false);
                setShowLogoutPopup(false);
                localStorage.removeItem("token");
                sessionStorage.clear();
                navigate('/');
                toast.success("Logged out successfully");
            }, 1000);
        } catch (error) {
            console.error("Logout failed:", error);
            setIsLoggingOut(false);
            localStorage.removeItem("token");
            sessionStorage.clear();
            navigate('/');
            toast.success("Logged out successfully");
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutPopup(false);
    };

    return (
        <>
            <div className='flex flex-col h-full fixed bg-[#333] w-64 text-white justify-between flex-shrink-0 '>
                <div className='gap-8' >
                    <div className='flex px-8 ml-0 pb-4 my-5 border-b border-gray-700 '>
                        <img src={assets.learnovalogo} alt="Learnova Logo" className="h-16 hover:cursor-pointer " />
                    </div>
                    <div className='flex flex-col gap-2 mr-2 my-8'>
                        <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 px-3 ml-0 py-2 rounded-r-lg transition-colors 
                            ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                        }>
                            <HomeIcon />
                            <span> Home</span>
                        </NavLink>
                        <NavLink to="/classroom" className={({ isActive }) => `flex items-center gap-2 px-3 ml-0 py-2 rounded-r-lg transition-colors 
                             ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                        }>
                            <BookOpenText />
                            <span> Classroom</span>
                        </NavLink>
                        <NavLink to="/community" className={({ isActive }) => `flex items-center gap-2 px-3 ml-0 py-2 rounded-r-lg transition-colors 
                             ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                        }>
                            <Users />
                            <span> Community</span>
                        </NavLink>

                        <NavLink to="/messages" className={({ isActive }) => `flex items-center gap-2 px-3 ml-0 py-2 rounded-r-lg transition-colors 
                             ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                        }>
                            <MessageSquareIcon />
                            <span> Messages</span>
                        </NavLink>
                        <NavLink to="/Notification" className={({ isActive }) =>
                            `flex items-center gap-2 px-3 ml-0 py-2 rounded-r-lg  transition-colors 
                                ${isActive ? "bg-[#BB86FC]/20 text-[#BB86FC]" : "text-gray-400 hover:bg-gray-800/20 hover:text-white"}`
                        }>
                            <Bell />
                            <span> Notifications</span>
                        </NavLink>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-700 ">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">AJ</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium">Name</div>
                            <div className="text-xs text-gray-400">11-1</div>
                        </div>
                        <Settings className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
                        <LogOut onClick={handleLogoutClick} className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
                    </div>
                </div>
            </div>

            {/* Logout Confirmation Popup */}
            {showLogoutPopup && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    {/* Popup Container */}
                    <div className="bg-[#333]  rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in duration-300">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <LogOut className="text-red-600" size={20} />
                                </div>
                                <h2 className="text-xl font-semibold text-white">
                                    Confirm Logout
                                </h2>
                            </div>
                            <button
                                onClick={handleCancelLogout}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                disabled={isLoggingOut}
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-white text-center mb-6">
                                Are you sure you want to logout? You'll need to sign in again to access your account.
                            </p>

                           
                            <div className="flex gap-3">
                            <button
                                    onClick={handleConfirmLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Logging out...
                                        </>
                                    ) : (
                                        <>
                                            <LogOut size={16} />
                                            Logout
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleCancelLogout}
                                    disabled={isLoggingOut}
                                    className="flex-1 px-4 py-3  bg-red-500 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}