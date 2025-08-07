import React from 'react'
import HomeNav from '@/components/page/HomeNav'
import { assets } from './../assets/assets.js'
import HomeFooter from '@/components/page/HomeFooter.jsx'
import { useState } from "react";
import AuthModal from '../components/auth/AuthModal.jsx';



const Homepage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <HomeNav />
            {/* <div className='bg-[#F5F1F1] w-full h-full '> */}

            <div className='bg-[#F5F1F1] flex flex-row items-center justify-center w-full min-h-screen h-11/12 gap-32 '>
                <div className='flex flex-col max-w-180 max-h-150 gap-4 items-left justify-start px-12'>
                    <h2 className='text-6xl font-extrabold text-[#333] '>Empower Learning.</h2>
                    <h2 className='text-6xl font-extrabold text-[#333] '>Anytime, Anywhere.</h2>
                    <p className='text-xl font-medium text-[#333] text-left'>Join a seamless, interactive digital classroom experience designed for the future of education. Connect, collaborate, and learn with cutting-edge tools.</p>
                    <div className='flex flex-row h-14 w-full gap-4 mt-3 '>
                        <button style={{ padding: '12px 32px' }} className='bg-[#333] text-white px-6 py-2 rounded text-2xl' onClick={() => setIsModalOpen(true)} >Start Learning</button>
                        <button className='border-2 border-[#333] rounded px-6 py-2 text-2xl'>Know more</button>
                    </div>


                </div>
                <img src={assets.hero1} alt="Hero Image" className='w-150 h-150 object-cover' />
            </div>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div style={{ padding: "40px 150px" }} className='bg-[#ADF0CC]/50 flex flex-col gap-6 items-center justify-start w-full min-h-screen h-11/12'>
                <h2 className='text-6xl font-bold  text-[#333] px-44'>Why learnOva?</h2>
                <p className='text-xl font-medium text-[#333] w-150 text-center'>Experience a comprehensive digital classroom with all the tools you need for effective learning and teaching.</p>
            </div>
            <HomeFooter />
            {/* </div> */}
        </>
    )
}

export default Homepage