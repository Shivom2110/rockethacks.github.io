import { useState, useEffect } from 'react';
import RocketIcon from '@/assets/Rocket-Icon-Final.svg';

export default function AnimatedRocket() {
    const [scroll, setScroll] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        setScroll(scrollPercent);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div 
        className="fixed 
                  right-3 sm:right-6 md:right-8 lg:right-10 
                  bottom-4 sm:bottom-6 md:bottom-8 
                  transition-all duration-300 z-50"
        style={{
          transform: `translateY(${-scroll * 7}px)`,
          opacity: scroll > 95 ? 0 : 1
        }}
      >
        {/* Rocket SVG */}
        <div className="drop-shadow-[0_0_10px_rgba(244,226,108,0.5)]">
          <RocketIcon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
        </div>
        
        {/* Animated Trail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Animated trail line */}
          <div className="relative">
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 
                         w-0.5 sm:w-1 
                         bg-gradient-to-b from-[#f4e26c] to-transparent 
                         rounded-full transition-all duration-300"
              style={{
                height: `${Math.min(scroll * 1.2, 150)}px`, // Adjusted for mobile
                opacity: Math.min(scroll * 0.02, 0.7),
                animation: 'pulseTrail 2s infinite'
              }}
            />
          </div>
        </div>
        
        {/* Styles for trail animation */}
        <style jsx>{`
          @keyframes pulseTrail {
            0%, 100% {
              opacity: 0.7;
            }
            50% {
              opacity: 0.3;
            }
          }
        `}</style>
      </div>
    );
  };