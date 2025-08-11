import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    { question: "What is learnova?", answer: "Learnova is your intelligent learning companion that helps you learn effectively with AI tools, communities, and resources." },
    { question: "Is it paid or free?", answer: "Learnova offers both free and paid plans to suit different learning needs." },
    { question: "Is my data secure when I use learnova?", answer: "Yes, your data is encrypted and handled according to industry-standard privacy practices." },
    { question: "What is community?", answer: "Community is a place where learners can share resources, discuss ideas, and collaborate." },
    { question: "Is AI assistant free or paid?", answer: "Basic AI assistant features are free; advanced tools require a paid subscription." }
];

export default function LearnOvaFAQs() {
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

    return (
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
                                className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors duration-200"
                                onClick={toggleAll}
                            >
                                {openIndex === "all" ? "Collapse all" : "Expand all"}
                            </button>
                        </div>

                        {/* FAQ Items */}
                        <div className="space-y-0">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200">
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
                                        <span className="text-lg md:text-xl font-medium text-gray-900 pr-4 group-hover:text-blue-600 transition-colors duration-200">
                                            {faq.question}
                                        </span>
                                        <div className="flex-shrink-0 mt-1">
                                            {openIndex === index || openIndex === "all" ? (
                                                <Minus className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors duration-200" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Answer with smooth animation */}
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
    );
}