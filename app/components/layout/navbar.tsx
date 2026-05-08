'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order Online' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHome = pathname === '/';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || !isHome
          ? 'rgba(44,44,44,0.98)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl"
              style={{ background: 'var(--red)', color: 'var(--cream)' }}
            >
              🍕
            </div>
            <div>
              <p
                className="font-display font-bold text-xl leading-none"
                style={{ color: 'var(--cream)' }}
              >
                Pizza Garden
              </p>
              <p
                className="text-xs tracking-widest uppercase"
                style={{ color: 'var(--gold)' }}
              >
                Restaurant & Bar
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold rounded transition-all duration-200 relative"
                  style={{
                    color: active ? 'var(--gold)' : 'rgba(255,248,240,0.85)',
                    letterSpacing: '0.03em',
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded"
                      style={{ background: 'var(--gold)' }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/order"
              className="ml-3 btn-primary text-sm py-2.5 px-6"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: 'var(--cream)',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(4px, 5px)'
                        : i === 2
                        ? 'rotate(-45deg) translate(4px, -5px)'
                        : 'opacity: 0'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(44,44,44,0.98)',
        }}
      >
        <div className="container-main py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-4 text-sm font-semibold rounded transition-colors"
              style={{
                color:
                  pathname === link.href
                    ? 'var(--gold)'
                    : 'rgba(255,248,240,0.85)',
                background:
                  pathname === link.href
                    ? 'rgba(192,57,43,0.2)'
                    : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setMenuOpen(false)}
            className="btn-primary text-center mt-2"
          >
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}