// components/layout/Navbar.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiShoppingCart, FiUser } from "react-icons/fi";
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
  const { data: session } = useSession();
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-brand-charcoal shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-display font-bold text-white group-hover:text-brand-red-light transition-colors">
              🍕 Pizza Garden
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-body font-semibold tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-brand-red-light border-b-2 border-brand-red-light pb-0.5"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/order"
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center gap-2">
                {(session.user as any).role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-xs bg-brand-red text-white px-3 py-1.5 rounded-full font-semibold hover:bg-brand-red-dark transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-gray-300 hover:text-white transition-colors font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors font-semibold"
              >
                <FiUser size={16} />
                Sign In
              </Link>
            )}

            <Link
              href="/order"
              className="bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
            >
              Order Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-charcoal border-t border-gray-700">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold py-2 border-b border-gray-700 transition-colors ${
                  pathname === link.href ? "text-brand-red-light" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                href="/order"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-brand-red text-white text-center text-sm font-bold py-2 rounded-full hover:bg-brand-red-dark transition-colors"
              >
                Order Now
              </Link>
              {session ? (
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); setIsOpen(false); }}
                  className="flex-1 border border-gray-600 text-gray-300 text-sm font-semibold py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-gray-600 text-gray-300 text-center text-sm font-semibold py-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
