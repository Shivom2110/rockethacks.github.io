"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import localFont from "next/font/local";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const terminal = localFont({ src: "../../app/fonts/terminal-grotesque.ttf" });

const teamMembers = [
  { name: "Executives", role: "Title", img: "/team/joon.jpg" },
  { name: "Event-Logistics", role: "Title", img: "/team/greer.jpg" },
  { name: "Sponsorship and Finance", role: "Title", img: "/team/cheng.jpg" },
  { name: "Tech-Dev", role: "Title", img: "/team/judge.jpg" },
  { name: "High-school Planning", role: "Title", img: "/team/kevin.jpg" },
  { name: "Marketing", role: "Title", img: "/team/xyz.jpg" },
  { name: "Experience", role: "Title", img: "/team/abc.jpg" },
];

export default function TeamPage() {
  return (
    <section className="bg-[#081d41] text-white min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <h1 className={`${terminal.className} text-6xl font-bold text-center mb-6 text-[#FFDA20]`}>
        Meet the Team
      </h1>
      <p className="text-lg text-center mb-10 max-w-2xl">
        Meet the passionate individuals behind our organization who bring ideas to life and make innovation happen!
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}  // Reduced spacing between slides
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="bg-white text-black rounded-lg shadow-lg p-10 flex flex-col items-center w-[500px] h-[400px] mx-2">
              <Image
                src={member.img}
                alt={member.name}
                width={200}
                height={200}
                className="w-48 h-48 rounded-full object-cover mb-6"
                priority
              />
              <h3 className={`${terminal.className} text-2xl font-semibold text-center leading-tight text-yellow-500`}>
                {member.name}
              </h3>
              <p className="text-lg text-gray-600 text-center mt-2">{member.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
