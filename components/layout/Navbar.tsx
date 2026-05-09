"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "var(--brand-charcoal)"
          : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(201,168,76,0.15)"
          : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 flex items-center justify-center"
              style={{ background: "var(--brand-gold)" }}
            >
              <span className="text-[var(--brand-charcoal)] font-display font-bold text-sm">PG</span>
            </div>
            <div>
              <div
                className="font-display text-lg font-bold text-white leading-none tracking-wide"
              >
                Pizza Garden
              </div>
              <div
                className="text-[var(--brand-gold)] text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                Restaurant &amp; Bar
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
                style={{ fontFamily: "var(--font-lato)" }}
              >
                <span
                  className="text-xs tracking-widest uppercase font-semibold transition-colors duration-200"
                  style={{
                    color:
                      pathname === link.href
                        ? "var(--brand-gold)"
                        : "rgba(255,255,255,0.7)",
                  }}
                >
                  {link.label}
                </span>
                {/* Underline */}
                <div
                  className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                  style={{
                    background: "var(--brand-gold)",
                    width: pathname === link.href ? "100%" : "0%",
                  }}
                />
                <div
                  className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "rgba(201,168,76,0.5)" }}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/order"
              className="relative p-2 text-white/60 hover:text-[var(--brand-gold)] transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart size={18} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 text-[10px] font-bold w-4 h-4 flex items-center justify-center"
                  style={{
                    background: "var(--brand-gold)",
                    color: "var(--brand-charcoal)",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/order" className="btn-gold px-5 py-2.5 ml-2">
              Order Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "var(--brand-charcoal)",
            borderColor: "rgba(201,168,76,0.2)",
          }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold py-2 border-b tracking-widest uppercase transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  color:
                    pathname === link.href
                      ? "var(--brand-gold)"
                      : "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-lato)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex pt-2">
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="w-full btn-gold py-3 text-center"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}