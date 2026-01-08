"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import Image from "next/image";
import { useTheme } from "@/app/components/ThemeProvider";
import { TextAnimate } from "@/app/components/ui/text-animate";

export default function ContactSection() {
  const { resolvedTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const placeholders = {
    dark: {
      name: "Darth Vader",
      email: "vader@sith.gov",
      subject: "Join the Dark Side!",
      message: "The Force is strong with this one. Join me and we will rule the galaxy...",
    },
    light: {
      name: "Master Yoda",
      email: "yoda@jedi.order",
      subject: "May the Force be with you, hmm?",
      message: "Always pass on what you have learned. Share your thoughts, you must...",
    },
  };

  const currentPlaceholders = placeholders[resolvedTheme === "dark" ? "dark" : "light"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // EmailJS configuration from environment variables
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    // Fallback to mailto if EmailJS is not configured
    if (!serviceId || !templateId || !publicKey) {
      const mailtoLink = `mailto:attanavaid@gmail.com?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact"
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    // Initialize EmailJS with public key
    emailjs.init(publicKey);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "attanavaid@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-8 sm:py-12 md:py-18 lg:py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <TextAnimate 
            animation="blurIn" 
            as="h2"
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4"
          >
            Get In Touch
          </TextAnimate>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Your time zone doesn&apos;t matter. I can adapt my schedule to match yours!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:font-medium"
                  placeholder={currentPlaceholders.name}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:font-medium"
                  placeholder={currentPlaceholders.email}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:font-medium"
                  placeholder={currentPlaceholders.subject}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full border-2 border-gray-400 dark:border-gray-600 focus:border-black dark:focus:border-white resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 placeholder:font-medium"
                  placeholder={currentPlaceholders.message}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-white/90 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitStatus === "success" && (
                <Alert className="border-2 border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                  <AlertDescription className="text-black dark:text-white font-medium text-center">
                    {process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
                      ? "✓ Message sent successfully! I'll get back to you soon."
                      : "✓ Your email client should open shortly."}
                  </AlertDescription>
                </Alert>
              )}

              {submitStatus === "error" && (
                <Alert className="border-2 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/20">
                  <AlertDescription className="text-red-600 dark:text-red-400 font-medium text-center">
                    Something went wrong. Please try again or email directly.
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="p-8 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              {/* Direct Email */}
              <a
                href="mailto:attanavaid@gmail.com"
                className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 mb-6 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white dark:text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm hidden sm:block text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-base md:text-lg font-medium text-black dark:text-white break-all sm:break-normal">
                    attanavaid@gmail.com
                  </p>
                </div>
              </a>

              {/* Social Links */}
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                  Find me on
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://github.com/attanavaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Image
                      src="/skills/tech/github.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="w-6 h-6 dark:invert"
                    />
                  </a>
                  <a
                    href="https://linkedin.com/in/attanavaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Image
                      src="/skills/tech/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="w-6 h-6 dark:invert"
                    />
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=16673454340"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="WhatsApp"
                  >
                    <Image
                      src="/skills/tech/whatsapp.svg"
                      alt="WhatsApp"
                      width={24}
                      height={24}
                      className="w-6 h-6 dark:invert"
                    />
                  </a>
                  <a
                    href="https://discordapp.com/users/302309055672614922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="Discord"
                  >
                    <Image
                      src="/skills/tech/discord.svg"
                      alt="Discord"
                      width={24}
                      height={24}
                      className="w-6 h-6 dark:invert"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Stats or Info */}
            <div className="p-8 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
              <h4 className="text-lg font-bold text-black dark:text-white mb-4">
                Response Time
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                I typically respond within 24-48 hours. For urgent matters, feel free to reach out directly via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

