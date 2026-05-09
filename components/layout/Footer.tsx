import Link from "next/link";
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { RESTAURANT_INFO } from "@/lib/utils";

export default function Footer() {
  return (
    <footer style={{ background: "var(--brand-charcoal)" }}>
      {/* Top decorative band */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--brand-gold), transparent)",
        }}
      />

      {/* CTA Banner */}
      <div
        className="py-16 px-6 text-center border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-[var(--brand-gold)] text-xs tracking-[0.35em] uppercase block mb-4"
          style={{ fontFamily: "var(--font-lato)" }}
        >
          Ready to dine?
        </span>
        <h3
          className="font-display text-3xl sm:text-4xl font-bold text-white mb-6"
        >
          Reserve Your Table Today
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/order" className="btn-gold px-10 py-4 inline-block">
            Order Online
          </Link>
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="btn-outline-cream px-10 py-4 inline-block"
          >
            Call Us
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--brand-gold)" }}
              >
                <span className="font-display font-bold text-sm" style={{ color: "var(--brand-charcoal)" }}>
                  PG
                </span>
              </div>
              <div>
                <div className="font-display text-base font-bold text-white leading-none">Pizza Garden</div>
                <div
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--brand-gold)", fontFamily: "var(--font-lato)" }}
                >
                  Restaurant &amp; Bar
                </div>
              </div>
            </div>
            <p
              className="text-white/40 text-xs leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Obosi's finest pizza restaurant and bar. Crafted with love and the
              freshest ingredients, right in the heart of Anambra.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiInstagram, href: "#" },
                { Icon: FiFacebook, href: "#" },
                { Icon: FiTwitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-8 h-8 border flex items-center justify-center transition-all duration-300 hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold)]"
                  style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white text-[10px] tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/menu", label: "Our Menu" },
                { href: "/order", label: "Order Online" },
                { href: "/about", label: "About Us" },
                { href: "/reviews", label: "Reviews" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-[var(--brand-gold)] transition-colors text-xs tracking-wide"
                    style={{ fontFamily: "var(--font-lato)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white text-[10px] tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Find Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin size={13} className="mt-0.5 flex-shrink-0" style={{ color: "var(--brand-gold)" }} />
                <span className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "var(--font-lato)" }}>
                  {RESTAURANT_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone size={13} className="flex-shrink-0" style={{ color: "var(--brand-gold)" }} />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-white/40 hover:text-white transition-colors text-xs"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiClock size={13} className="flex-shrink-0" style={{ color: "var(--brand-gold)" }} />
                <span className="text-white/40 text-xs" style={{ fontFamily: "var(--font-lato)" }}>
                  {RESTAURANT_INFO.openTime} – {RESTAURANT_INFO.closeTime}
                </span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4
              className="text-white text-[10px] tracking-[0.3em] uppercase font-semibold mb-6"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {[
                { day: "Monday – Friday", hours: "10AM – 8PM" },
                { day: "Saturday", hours: "10AM – 9PM" },
                { day: "Sunday", hours: "12PM – 7PM" },
              ].map((item) => (
                <li
                  key={item.day}
                  className="flex justify-between gap-4 pb-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <span className="text-white/30 text-xs" style={{ fontFamily: "var(--font-lato)" }}>
                    {item.day}
                  </span>
                  <span className="text-white text-xs font-semibold" style={{ fontFamily: "var(--font-lato)" }}>
                    {item.hours}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs" style={{ fontFamily: "var(--font-lato)" }}>
                Open Now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t py-6 px-6"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-white/20 text-xs"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            © {new Date().getFullYear()} Pizza Garden, Obosi. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <Link
                key={label}
                href="#"
                className="text-white/20 hover:text-white/50 transition-colors text-xs"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}