import React from 'react'
import HomeNav from '@/components/shared/HomeNav.jsx'
import { assets } from './../assets/assets.js'
import Footer from '@/components/shared/Footer.jsx'
import { useState } from "react";
import AuthModal from '../components/auth/AuthModal.jsx';
import { Plus, Minus , Play, FileText, Cloud, MessageCircle, BarChart3, Smartphone } from "lucide-react";


const Homepage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const features = [
        {
            icon: Play,
            title: "HD Video Classes",
            description: "Crystal-clear video conferencing with advanced features like screen sharing, breakout rooms, and interactive whiteboards."
        },
        {
            icon: FileText,
            title: "Smart Assignments",
            description: "AI-powered assignment creation, automatic grading, and detailed analytics to track student progress and performance."
        },
        {
            icon: Cloud,
            title: "Cloud Library",
            description: "Unlimited cloud storage for resources, documents, and multimedia content with intelligent organization and search."
        },
        {
            icon: MessageCircle,
            title: "Real-time Chat",
            description: "Instant messaging, group discussions, and announcement system to keep everyone connected and informed."
        },
        {
            icon: BarChart3,
            title: "Analytics Dashboard",
            description: "Comprehensive insights into learning progress, engagement metrics, and personalized recommendations for improvement."
        },
        {
            icon: Smartphone,
            title: "Mobile Ready",
            description: "Seamless experience across all devices with native mobile apps and responsive web design for learning on-the-go."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const toggleAll = () => {
        if (openIndex === "all") {
            setOpenIndex(null);
        } else {
            setOpenIndex("all");
        }
    };

    const faqs = [
        { question: "What is learnova?", answer: "Learnova is your intelligent learning companion that helps you learn effectively with AI tools, communities, and resources." },
        { question: "Is it paid or free?", answer: "Learnova offers both free and paid plans to suit different learning needs." },
        { question: "Is my data secure when I use learnova?", answer: "Yes, your data is encrypted and handled according to industry-standard privacy practices." },
        { question: "What is community?", answer: "Community is a place where learners can share resources, discuss ideas, and collaborate." },
        { question: "Is AI assistant free or paid?", answer: "Basic AI assistant features are free; advanced tools require a paid subscription." }
    ];



    return (
        <>
            <HomeNav />
            <div className='bg-[#F5F1F1] flex flex-row items-center justify-center w-full min-h-screen h-full gap-5 px-52 py-32'>
                <div className='flex flex-col max-w-150 max-h-full gap-2 items-left justify-start px-12'>
                    <h2 className='text-5xl font-extrabold text-[#333] '>Empower Learning.</h2>
                    <h2 className='text-5xl font-extrabold text-[#333] '>Anytime, Anywhere.</h2>
                    <p className='text-xl font-medium text-[#333] text-left'>Join a seamless, interactive digital classroom experience designed for the future of education. Connect, collaborate, and learn with cutting-edge tools.</p>
                    <div className='flex flex-row h-14 w-full gap-4 mt-3 '>
                        <button className='bg-[#333] text-white px-6 py-2 rounded text-xl hover:cursor-pointer' onClick={() => setIsModalOpen(true)} >Start Learning</button>
                        <button className='border-2 border-[#333] rounded px-6 py-2 text-xl hover:cursor-pointer'>Know more</button>
                    </div>


                </div>
                <img src={assets.hero1} alt="Hero Image" className='w-150 min-h-fit h-full max-h-full object-cover' />
            </div>


            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />


            <div className="className='bg-[#ADF0CC]/50 flex flex-col gap-6 items-center justify-start w-full min-h-fit h-fit  bg-gradient-to-br from-[#ADF0CC]/10 via-[#ADF0CC]/20 to-[#ADF0CC]/30 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-6xl font-bold  text-[#333] px-44  md:text-5xl  mb-4">
                            Why learnOva?
                        </h1>
                        <p className="text-lg md:text-xl text-[#333] max-w-2xl mx-auto">
                            Experience a comprehensive digital classroom with all the tools you need for effective learning and teaching.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-b from-[#FFE4D8]/30 to-[#F7F7F7]/30 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-1xl transition-all duration-300 hover:-translate-y-1 border border-white/10"
                                >
                                    {/* Icon */}
                                    <div className="mb-5">
                                        <div className="w-14 h-14  rounded-2xl flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 w-full min-h-full">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                        {/* Left Side Heading */}
                        <div className="lg:col-span-1">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Frequently Asked<br />Questions
                            </h2>
                        </div>

                        {/* FAQ List */}
                        <div className="lg:col-span-2">
                            {/* Expand/Collapse All Button */}
                            <div className="flex justify-end mb-6">
                                <button
                                    className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors duration-200 hover:cursor-pointer"
                                    onClick={toggleAll}
                                >
                                    {openIndex === "all" ? "Collapse all" : "Expand all"}
                                </button>
                            </div>

                            {/* FAQ Items */}
                            <div className="space-y-0">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-200 ">
                                        <button
                                            onClick={() => {
                                                if (openIndex === "all") {
                                                    setOpenIndex(null);
                                                } else {
                                                    toggle(index);
                                                }
                                            }}
                                            className="flex items-start justify-between w-full text-left py-6 hover:bg-gray-50/50 transition-colors duration-200 group"
                                        >
                                            <span className="hover:cursor-pointer text-lg md:text-xl font-medium text-gray-900 pr-4 group-hover:text-gray-600 transition-colors duration-200">
                                                {faq.question}
                                            </span>
                                            <div className="flex-shrink-0 mt-1">
                                                {openIndex === index || openIndex === "all" ? (
                                                    <Minus className="hover:cursor-pointer w-5 h-5 text-gray-500 group-hover:text-gray-600 transition-colors duration-200" />
                                                ) : (
                                                    <Plus className="w-5 h-5 text-gray-500 group-hover:text-gray-600 transition-colors duration-200" />
                                                )}
                                            </div>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index || openIndex === "all"
                                            ? 'max-h-96 opacity-100'
                                            : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="pb-6 pr-8">
                                                <p className="text-base text-gray-700 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Homepage