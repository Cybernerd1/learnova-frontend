import React from 'react'
import { useState } from "react";
import AuthModal from '../auth/AuthModal';
import { assets } from '../../assets/assets.js'
import { ArrowRight } from 'lucide-react';


const HomeNav = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex flex-row items-center justify-between max-w-full w-full h-16 fixed p-10 top-0 bg-white/90 text-[#333333]">
                <div className='flex p-4 m-4'>
                    <img src={assets.learnovalogo} alt="Learnova Logo" className="h-20" />
                </div>
                <div className="flex space-x-4 gap-8 text-2xl font-medium">
                    <a href="#Home" className="hover:text-gray-300">Home</a>
                    <a href="#Features" className="hover:text-gray-300">Features</a>
                    <a href="#Faqs" className="hover:text-gray-300">FAQs</a>
                    <a href="#Contact" className="hover:text-gray-300">Contact Us</a>
                </div>
                <div>
                    <button className='border-2 flex flex-row  border-[#333] rounded-full px-6 py-2 m-4 text-2xl' onClick={() => setIsModalOpen(true)}>
                        Get Started
                    </button>
                </div>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default HomeNav