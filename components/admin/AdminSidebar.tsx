// components/admin/AdminSidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FiHome, FiShoppingBag, FiList, FiStar,
  FiSettings, FiLogOut, FiExternalLink,
} from "react-icons/fi";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: FiHome },
  { href: "/admin/menu", label: "Menu Items", icon: FiShoppingBag },
  { href: "/admin/orders", label: "Orders", icon: FiList },
  { href: "/admin/reviews", label: "Reviews", icon: FiStar },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-brand-charcoal flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin" className="text-xl font-display font-bold text-white">
          🍕 Pizza Garden
        </Link>
        <p className="text-xs text-gray-400 mt-0.5 font-body">Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-brand-red text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <FiExternalLink size={18} />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-400 hover:text-red-400 hover:bg-white/5 transition-all"
        >
          <FiLogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
