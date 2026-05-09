// components/layout/Footer.tsx
import Link from "next/link";
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { RESTAURANT_INFO } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-display font-bold text-white mb-3">🍕 Pizza Garden</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Obosi's favorite pizza restaurant and bar. Crafted with love and the finest ingredients.
            </p>
            <div className="flex gap-3 mt-4">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center hover:border-brand-red hover:text-brand-red-light transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/about", label: "About Us" },
                { href: "/reviews", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-red-light transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin size={14} className="text-brand-red-light mt-0.5 flex-shrink-0" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={14} className="text-brand-red-light flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiClock size={14} className="text-brand-red-light flex-shrink-0" />
                <span>{RESTAURANT_INFO.openTime} – {RESTAURANT_INFO.closeTime}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              {[
                { day: "Monday – Friday", hours: "10:00 AM – 8:00 PM" },
                { day: "Saturday", hours: "10:00 AM – 9:00 PM" },
                { day: "Sunday", hours: "12:00 PM – 7:00 PM" },
              ].map((item) => (
                <li key={item.day} className="flex justify-between gap-4">
                  <span className="text-gray-400">{item.day}</span>
                  <span className="text-white font-medium">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Pizza Garden. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
