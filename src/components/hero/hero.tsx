// src/components/hero/Hero.tsx
import React, { useState, useEffect } from 'react';
import { LampDemo } from "@/components/ui/lamp";
import NameLogo from '@/assets/name-logo.svg';
import { supabase } from '@/lib/supabase';

export const Hero = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Add connection verification on component mount
  useEffect(() => {
    async function verifyConnection() {
      console.log('Initializing Supabase connection check...');
      
      // Simply log that we're attempting to connect
      console.log('Attempting to connect to Supabase...', {
        timestamp: new Date().toISOString()
      });

      try {
        // Test the connection by making a simple query
        const { data, error } = await supabase
          .from('email_list')
          .select('id')
          .limit(1);

        if (error) {
          console.error('Supabase connection test failed:', error);
          setConnectionStatus('error');
          return;
        }

        console.log('Supabase connection test successful:', {
          dataReceived: !!data,
          timestamp: new Date().toISOString()
        });
        setConnectionStatus('connected');

      } catch (err) {
        console.error('Unexpected error during connection test:', err);
        setConnectionStatus('error');
      }
    }

    verifyConnection();
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail) || newEmail === '');
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setIsValidEmail(false);
      return;
    }

    if (connectionStatus !== 'connected') {
      alert('Database connection is not ready. Please try again in a moment.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Attempting to insert email:', email);
      
      // First check if email exists
      const { data: existingEmails, error: checkError } = await supabase
        .from('email_list')
        .select('email_id')
        .eq('email_id', email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {  // PGRST116 means no rows found
        console.error('Error checking for existing email:', checkError);
        throw new Error('Error checking subscription status');
      }

      if (existingEmails) {
        throw new Error('This email is already subscribed!');
      }

      // If email doesn't exist, insert it
      const { error: insertError } = await supabase
        .from('email_list')
        .insert([{ 
          email_id: email,
          subscribed_at: new Date().toISOString()
        }]);

      if (insertError) {
        console.error('Insert error:', insertError);
        throw new Error(insertError.message);
      }

      console.log('Email successfully inserted');
      setSubmitStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      alert(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen w-full flex flex-col items-center justify-center 
                 px-4 sm:px-6 md:px-8 
                 pt-16 sm:pt-20 md:pt-24
                 pb-8 sm:pb-12 md:pb-16"
    >
      <div className="w-full max-w-[100vw] overflow-hidden">
        <LampDemo />
      </div>
      
      <div className="mb-6 sm:mb-8 md:mb-10 ml-[5px] sm:ml-[10px]
                    transform scale-75 sm:scale-90 md:scale-100">
        <NameLogo className="w-[280px] sm:w-[320px] md:w-[400px] 
                            h-auto text-[#FFDA00]" />
      </div>
      
      <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-md mx-auto relative mb-8 sm:mb-10 md:mb-12">
        <input
          id="email-input"
          type="email"
          placeholder="Enter email to stay updated"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting || connectionStatus !== 'connected'}
          className={`w-full 
                     px-4 sm:px-6 
                     py-3 sm:py-4 
                     text-sm sm:text-base
                     rounded-full bg-white/10 backdrop-blur-sm 
                     border ${!isValidEmail ? 'border-red-500' : 'border-white/20'} 
                     text-white placeholder:text-white/50 
                     focus:outline-none focus:ring-2 focus:ring-[#f4e26c] focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed`}
        />
        {!isValidEmail && (
          <p className="text-red-500 text-xs sm:text-sm mt-1 ml-4">
            Please enter a valid email address
          </p>
        )}
        {submitStatus === 'success' && (
          <p className="text-green-500 text-xs sm:text-sm mt-1 ml-4">
            Thank you for subscribing!
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="text-red-500 text-xs sm:text-sm mt-1 ml-4">
            Failed to subscribe. Please try again.
          </p>
        )}
        {connectionStatus === 'checking' && (
          <p className="text-yellow-500 text-xs sm:text-sm mt-1 ml-4">
            Initializing connection...
          </p>
        )}
        {connectionStatus === 'error' && (
          <p className="text-red-500 text-xs sm:text-sm mt-1 ml-4">
            Connection error. Please try again later.
          </p>
        )}
        <button 
          onClick={handleSubmit}
          disabled={!isValidEmail || !email || isSubmitting || connectionStatus !== 'connected'}
          className={`absolute right-2 top-1/2 -translate-y-1/2 
                     bg-[#FFDA00] text-gray-900 
                     px-4 sm:px-6 
                     py-1.5 sm:py-2 
                     text-sm sm:text-base
                     rounded-full font-medium 
                     ${(!isValidEmail || !email || isSubmitting || connectionStatus !== 'connected') 
                       ? 'opacity-50 cursor-not-allowed' 
                       : 'hover:bg-[#f4e26c]/90'} 
                     transition-colors`}
        >
          {isSubmitting ? '...' : '→'}
        </button>
      </div>
    </section>
  );
};

export default Hero;