import React from 'react'
import assets from '../../assets/assets.js'
const Sidenav = () => {
    return (
        <>
            <div className='flex flex-col h-full fixed bg-[#333] '>
                <div className='flex p-4 m-4'>
                    <img src={assets.learnovalogo} alt="Learnova Logo" className="h-16 hover:cursor-pointer" />
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}

export default Sidenav