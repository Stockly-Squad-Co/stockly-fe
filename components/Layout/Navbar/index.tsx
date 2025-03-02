"use client";
import Link from "next/link";
import { useState } from "react";
import { SiNanostores } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/data";
import { fadeToBottomVariant } from "@/lib/data/variants";
import { useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 z-[100] w-full bg-white">
      <div className="bg-primary text-white text-sm text-center py-2">
        <p>
          Join Stockly today and simplify your store management - Sign up now!
        </p>
      </div>
      <div className="container rounded-full py-3 flex items-center justify-between">
        <div>
          <Link href={"/"} className="text-primary flex items-center gap-1">
            <SiNanostores />
            <span>Stockly</span>
          </Link>
        </div>

        <ul className="flex space-x-6">
          {navLinks.map((link, idx) => (
            <li key={idx} className="relative group">
              {link.sublinks ? (
                <button
                  onMouseEnter={() => setOpenDropdown(link.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                  className="text-text hover:text-primary font-medium flex items-center justify-center gap-1"
                >
                  <span>{link.title}</span>
                  <FiChevronDown
                    className={`duration-150 group-hover:rotate-180`}
                  />
                </button>
              ) : (
                <Link
                  href={link.href!}
                  className="text-text hover:text-primary font-medium"
                >
                  {link.title}
                </Link>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {link.sublinks && openDropdown === link.title && (
                  <motion.ul
                    {...fadeToBottomVariant}
                    className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
                    onMouseEnter={() => setOpenDropdown(link.title)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.sublinks.map((sublink, subIdx) => (
                      <li key={subIdx}>
                        <Link
                          href={`/${link.title.toLowerCase()}/${sublink
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-text hover:bg-gray-100"
                        >
                          {sublink}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            className="text-primary rounded-lg border-2 border-primary px-8 py-[10px] duration-300 hover:bg-primary hover:text-white"
            onClick={() => router.push("/account/login")}
          >
            Login
          </button>
          <button
            className="text-white rounded-lg border-2 border-primary bg-primary px-8 py-[10px] duration-300"
            onClick={() => router.push("/account/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
