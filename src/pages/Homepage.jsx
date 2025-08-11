import React from 'react'
import HomeNav from '@/components/page/HomeNav'
import { assets } from './../assets/assets.js'
import Footer from '@/components/page/Footer.jsx'
import { useState } from "react";
import AuthModal from '../components/auth/AuthModal.jsx';
import LearnOvaFeatures from '../components/Homepage/LearnOvaFeatures.jsx';
import LearnOvaHero from '@/components/Homepage/LearnOvaHero.jsx';
import LearnOvaFAQs from '@/components/Homepage/LearnOvaFAQs.jsx';



const Homepage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <HomeNav />


            <LearnOvaHero />
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <LearnOvaFeatures />
            <LearnOvaFAQs />
            <Footer />

        </>
    )
}

export default Homepage