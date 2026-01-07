"use client";

import Image from "next/image";
import { commonImages } from "../utils/imageImports";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative border-t-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02] dark:opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle, gray 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, "hero")}
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="relative h-12 w-12 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={commonImages.logo}
                  alt="Atta Navaid Logo"
                  fill
                  className="object-contain dark:invert"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black dark:text-white" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  Atta Navaid
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Full-stack Developer
                </p>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/attanavaid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Image
                src="/skills/tech/github.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="w-5 h-5 dark:invert"
              />
            </a>
            <a
              href="https://linkedin.com/in/attanavaid"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Image
                src="/skills/tech/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
                className="w-5 h-5 dark:invert"
              />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=16673454340"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="WhatsApp"
            >
              <Image
                src="/skills/tech/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="w-5 h-5 dark:invert"
              />
            </a>
            <a
              href="https://discordapp.com/users/302309055672614922"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Discord"
            >
              <Image
                src="/skills/tech/discord.svg"
                alt="Discord"
                width={20}
                height={20}
                className="w-5 h-5 dark:invert"
              />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-4 mt-4">
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Atta Navaid. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

