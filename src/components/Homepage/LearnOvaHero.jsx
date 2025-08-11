import React from 'react'
import { assets } from '../../assets/assets.js'

const LearnOvaHero = () => {
    return (
        <>
            <div className='bg-[#F5F1F1] flex flex-row items-center justify-center w-full min-h-screen h-full gap-5 p-52'>
                <div className='flex flex-col max-w-150 max-h-full gap-2 items-left justify-start px-12'>
                    <h2 className='text-5xl font-extrabold text-[#333] '>Empower Learning.</h2>
                    <h2 className='text-5xl font-extrabold text-[#333] '>Anytime, Anywhere.</h2>
                    <p className='text-xl font-medium text-[#333] text-left'>Join a seamless, interactive digital classroom experience designed for the future of education. Connect, collaborate, and learn with cutting-edge tools.</p>
                    <div className='flex flex-row h-14 w-full gap-4 mt-3 '>
                        <button style={{ padding: '12px 32px' }} className='bg-[#333] text-white px-6 py-2 rounded text-2xl' onClick={() => setIsModalOpen(true)} >Start Learning</button>
                        <button className='border-2 border-[#333] rounded px-6 py-2 text-2xl'>Know more</button>
                    </div>


                </div>
                <img src={assets.hero1} alt="Hero Image" className='w-150 min-h-fit h-full max-h-full object-cover' />
            </div>
        </>
    )
}

export default LearnOvaHero