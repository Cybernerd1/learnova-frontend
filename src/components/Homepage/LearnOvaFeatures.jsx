import React from 'react';
import { Play, FileText, Cloud, MessageCircle, BarChart3, Smartphone } from 'lucide-react';

export default function LearnOvaFeatures() {
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

  return (
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
  );
}