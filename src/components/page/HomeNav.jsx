import React from 'react'
import { useState } from "react";
import AuthModal from '../auth/AuthModal';
import { assets } from '../../assets/assets.js'
import { ArrowRight } from 'lucide-react';


const HomeNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center justify-between max-w-full w-full h-12 fixed p-8 top-0 bg-white text-[#333333] z-100">
                <div className='flex p-4 m-4'>
                    <img src={assets.learnovalogo} alt="Learnova Logo" className="h-16 hover:cursor-pointer" />
                </div>
                <div className="flex justify-center items-center gap-8 text-xl font-medium">
                    <a href="#Home" className="hover:text-[#777]">Home</a>
                    <a href="#Features" className="hover:text-[#777]">Features</a>
                    <a href="#Faqs" className="hover:text-[#777]">FAQs</a>
                    <a href="#Contact" className="hover:text-[#777]">Contact Us</a>
                </div>
                <div>
                    {/* <button className='border-2 flex flex-row  border-[#333] rounded-full px-4 py-2 mx-4 hover:cursor-pointer hover:bg-[#333] hover:text-white' onClick={() => setIsModalOpen(true)}>
                        Get Started
                    </button> */}
                    <button onClick={() => setIsModalOpen(true)}>
                        <a href="#_" className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#333] transition duration-300 ease-out border-2 border-[#333] rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#333] group-hover:translate-x-0 ease">
                            <p>Login</p>
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-[#333] transition-all duration-300 transform group-hover:translate-x-full ease">Get Started</span>
                            <span class="relative invisible">Button Text</span>
                        </a>
                    </button>
                </div>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default HomeNav