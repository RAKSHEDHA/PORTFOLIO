import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Project', href: '#projects' },
  { name: 'Service', href: '#services' },
  { name: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'py-4 bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="w-full px-8 md:px-16 flex justify-between items-center">
          
          {/* Left: RADA AI ASSISTANT */}
          <div>
            <a 
              href="#rada" 
              className="text-xs lg:text-sm font-bold uppercase tracking-widest text-black transition-opacity duration-300 cursor-pointer hover:opacity-70"
            >
              Rada AI Assistant
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            <ul className="flex space-x-6 lg:space-x-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs lg:text-sm font-bold uppercase tracking-widest text-black/70 hover:text-black transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Simple Email Me Button */}
          <div className="flex items-center gap-4">
            <a 
              href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=rakshedhab@gmail.com&subject=Let's%20Connect&body=Hi%20Rakshedha,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-block px-6 py-2 border-2 border-black bg-white text-black text-sm font-bold uppercase tracking-wider"
            >
              EMAIL ME
            </a>

            <button
              className="xl:hidden text-black transition-colors z-[210]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[190] flex flex-col items-center justify-center transition-all duration-500 ease-in-out xl:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        <ul className="relative z-10 flex flex-col space-y-8 text-center">
          {navLinks.map((link, index) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl tracking-[0.2em] uppercase font-black text-black"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a 
              href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=rakshedhab@gmail.com&subject=Let's%20Connect&body=Hi%20Rakshedha,%0A%0AI'd%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block px-8 py-3 border-2 border-black bg-white text-black font-black text-sm uppercase tracking-widest"
            >
              EMAIL ME
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}