"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBell, FaHeart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Students", href: "/students" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 flex justify-center w-full px-4">
      <div className="flex shadow-sm rounded-lg items-center justify-between w-full max-w-6xl bg-white px-4 py-2">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-[#ffd166]" />
          <span className="w-3 h-3 relative left-[-10px] rounded-full bg-[#6dd47e]" />
          <span className="w-3 h-3 relative left-[-20px] rounded-full bg-[#4f8cff]" />
          <span className="w-3 h-3 relative left-[-30px] rounded-full bg-[#ff6b6b]" />
        </div>

        <div className="flex items-center gap-8">
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm  ${
                  link.href === pathname ? "font-semibold" : "font-normal"
                } text-gray-700 hover:text-[var(--primary)] transition`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="sm:block hidden relative">
            <FaBell className="text-lg text-gray-500 hover:text-[var(--primary)]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
          <button className="sm:block hidden">
            <FaHeart className="text-lg text-pink-400 hover:text-pink-600" />
          </button>
          <button className="sm:block hidden">
            <FaUserCircle className="text-2xl text-gray-400 hover:text-[var(--primary)]" />
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Logout"
            className=" p-2 rounded hover:bg-gray-100 transition"
          >
            <FaSignOutAlt className="text-xl text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
