"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

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
    <section id="contact" className="relative py-32 px-6 bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 border-2 border-gray-300 dark:border-gray-700 opacity-20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 border-2 border-gray-300 dark:border-gray-700 opacity-10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02]"
            style={{
              backgroundImage: `
                radial-gradient(circle, gray 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
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
                  className="w-full border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white"
                  placeholder="Your name"
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
                  className="w-full border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white"
                  placeholder="your.email@example.com"
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
                  className="w-full border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white"
                  placeholder="What's this about?"
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
                  className="w-full border-2 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white resize-none"
                  placeholder="Tell me about your project or just say hello..."
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
                    <svg
                      className="w-6 h-6 text-black dark:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/attanavaid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-6 h-6 text-black dark:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
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

