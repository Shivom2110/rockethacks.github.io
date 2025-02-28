"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";

const terminal = localFont({ src: "../../app/fonts/terminal-grotesque.ttf" });

const teamSections = [
  {
    section: "High-school Planning",
    members: [
      { name: "Member 1", img: "/team/highschool1.jpg", link: "#" },
      { name: "Member 2", img: "/team/highschool2.jpg", link: "#" },
      { name: "Member 3", img: "/team/highschool3.jpg", link: "#" },
      { name: "Member 4", img: "/team/highschool4.jpg", link: "#" },
      { name: "Member 5", img: "/team/highschool5.jpg", link: "#" },
    ],
  },
  {
    section: "Event Logistics",
    members: [
      { name: "Member 1", img: "/team/event1.jpg", link: "#" },
      { name: "Member 2", img: "/team/event2.jpg", link: "#" },
      { name: "Member 3", img: "/team/event3.jpg", link: "#" },
      { name: "Member 4", img: "/team/event4.jpg", link: "#" },
      { name: "Member 5", img: "/team/event5.jpg", link: "#" },
    ],
  },
  {
    section: "Techdev",
    members: [
      { name: "Member 1", img: "/team/tech1.jpg", link: "#" },
      { name: "Aditya Mhambrey", img: "/team photos/IMG_1905.jpg", link: "#" },
      { name: "Shivom V R", img: "/team/tech3.jpg", link: "#" },
      { name: "Member 4", img: "/team/tech4.jpg", link: "#" },
      { name: "Member 5", img: "/team/tech5.jpg", link: "#" },
    ],
  },
  {
    section: "Sponsorship and Finance",
    members: [
      { name: "Nikhil Ankam", img: "/team photos/IMG_5031.jpg", link: "#" },
      { name: "Member 2", img: "/team/sponsor2.jpg", link: "#" },
      { name: "Member 3", img: "/team/sponsor3.jpg", link: "#" },
      { name: "Member 4", img: "/team/sponsor4.jpg", link: "#" },
      { name: "Member 5", img: "/team/sponsor5.jpg", link: "#" },
    ],
  },
  {
    section: "Executives",
    members: [
      { name: "Member 1", img: "/team/executive1.jpg", link: "#" },
      { name: "Member 2", img: "/team/executive2.jpg", link: "#" },
      { name: "Member 3", img: "/team/executive3.jpg", link: "#" },
      { name: "Member 4", img: "/team/executive4.jpg", link: "#" },
      { name: "Member 5", img: "/team/executive5.jpg", link: "#" },
    ],
  },
  {
    section: "Judging",
    members: [
      { name: "Member 1", img: "/team/judge1.jpg", link: "#" },
      { name: "Member 2", img: "/team/judge2.jpg", link: "#" },
      { name: "Member 3", img: "/team/judge3.jpg", link: "#" },
      { name: "Member 4", img: "/team/judge4.jpg", link: "#" },
      { name: "Member 5", img: "/team/judge5.jpg", link: "#" },
    ],
  },
  {
    section: "Marketing",
    members: [
      { name: "Member 1", img: "/team/marketing1.jpg", link: "#" },
      { name: "Member 2", img: "/team/marketing2.jpg", link: "#" },
      { name: "Member 3", img: "/team/marketing3.jpg", link: "#" },
      { name: "Member 4", img: "/team/marketing4.jpg", link: "#" },
      { name: "Member 5", img: "/team/marketing5.jpg", link: "#" },
    ],
  },
];

export default function TeamPage() {
  return (
    <section className="bg-[#081d41] text-white py-12 px-6">
      <h1 className={`${terminal.className} text-6xl font-bold text-center mb-12 text-[#FFDA20]`}>
        Meet the Team
      </h1>
      {teamSections.map((group, idx) => (
        <div key={idx} className="mb-12">
          <h2 className={`${terminal.className} text-3xl font-bold text-center mb-6`}>
            {group.section}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 justify-items-center">
            {group.members.map((member, i) => (
              <Link key={i} href={member.link} className="block">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover hover:opacity-80 transition-opacity"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
