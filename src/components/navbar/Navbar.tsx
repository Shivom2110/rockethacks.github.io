"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import RocketHacks from "../../../public/assets/name-logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-[#030c1b] text-white text-base sticky top-0 z-20 shadow-xl">
      {/* Logo and Hamburger Menu */}
      <div className="container flex justify-around sm:justify-between sm:mx-auto md:justify-center md:space-x-20 items-center h-[3.8rem]">
        {/* Logo */}
        <div className="font-bold">
          <Link href="/">
            <RocketHacks className="h-16 w-auto" />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="inline-block md:hidden z-30">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="space-x-10 hidden md:block lg:mr-20 font-medium">
          <Link href="#about">ABOUT US</Link>
          <Link href="#schedule">SCHEDULE</Link>
          <Link href="#sponsor">SPONSORS</Link>
          <Link href="#gallery">GALLERY</Link>
          <Link href="#contact">CONTACT</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="/team">MEET THE TEAM</Link> {/* 🔥 Added this */}
          <Link href="/assets/Code&CreateFlyer.pdf" target="_blank">
            CODE & CREATE
          </Link>
        </div>
      </div>

      {/* Mobile Full-Screen Navigation Menu */}
      {menuOpen && (
        <div className="bg-[#030c1b]/[99%] text-white inline-block xl:hidden fixed overflow-hidden inset-0 max-h-screen">
          <div className="flex flex-col space-y-10 items-center justify-center h-full text-3xl">
            <Link href="/assets/Code&CreateFlyer.pdf" target="_blank" onClick={toggleMenu}>
              Code & Create
            </Link>
            <Link href="#about" onClick={toggleMenu}>About Us</Link>
            <Link href="#schedule" onClick={toggleMenu}>Schedule</Link>
            <Link href="#sponsor" onClick={toggleMenu}>Sponsors</Link>
            <Link href="#gallery" onClick={toggleMenu}>Gallery</Link>
            <Link href="#contact" onClick={toggleMenu}>Contact Us</Link>
            <Link href="#faq" onClick={toggleMenu}>FAQ</Link>
            <Link href="/team" onClick={toggleMenu}>Meet the Team</Link> {/* 🔥 Added this */}
          </div>
        </div>
      )}
    </nav>
  );
}
