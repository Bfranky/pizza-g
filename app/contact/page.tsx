// app/contact/page.tsx
"use client";
import { useState } from "react";
import { FiPhone, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { RESTAURANT_INFO } from "@/lib/utils";
import toast from "react-hot-toast";

const popularTimes = [
  { time: "6am", height: 5 }, { time: "9am", height: 20 },
  { time: "12pm", height: 60 }, { time: "3pm", height: 80 },
  { time: "6pm", height: 100 }, { time: "9pm", height: 30 },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000)); // Simulate send
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <div className="bg-brand-charcoal pt-24 pb-16 px-4 text-center">
        <span className="text-brand-red-light text-sm font-bold tracking-[0.2em] uppercase">Get In Touch</span>
        <h1 className="font-display text-5xl font-bold text-white mt-2">Contact Us</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="font-display text-2xl font-bold text-brand-charcoal mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                <input
                  required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  required value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-brand-red transition-colors resize-none h-36"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit" disabled={sending}
                className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold py-3 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                <FiSend size={16} />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-display text-xl font-bold text-brand-charcoal mb-4">Find Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FiMapPin className="text-brand-red mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-sm">Address</p>
                    <p className="text-gray-500 text-sm">{RESTAURANT_INFO.address}</p>
                    <a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-brand-red text-xs font-semibold hover:underline">
                      Open in Google Maps →
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <FiPhone className="text-brand-red flex-shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-gray-500 text-sm hover:text-brand-red transition-colors">{RESTAURANT_INFO.phone}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FiClock className="text-brand-red mt-0.5 flex-shrink-0" size={18} />
                  <div>
                    <p className="font-semibold text-sm">Hours</p>
                    <p className="text-gray-500 text-sm">Mon–Fri: 10am – 8pm</p>
                    <p className="text-gray-500 text-sm">Saturday: 10am – 9pm</p>
                    <p className="text-gray-500 text-sm">Sunday: 12pm – 7pm</p>
                  </div>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 font-bold transition-colors"
            >
              <FaWhatsapp size={28} />
              <div>
                <p>Chat on WhatsApp</p>
                <p className="text-xs font-normal text-green-100">We typically reply within minutes</p>
              </div>
            </a>

            {/* Popular Times */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-brand-charcoal mb-1">Popular Times — Thursday</h3>
              <p className="text-xs text-gray-400 mb-4">Plan your visit to avoid wait times</p>
              <div className="flex items-end gap-2 h-20">
                {popularTimes.map((bar) => (
                  <div key={bar.time} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-t-sm bg-brand-red/70" style={{ height: `${bar.height}%` }} />
                    <span className="text-xs text-gray-400">{bar.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
