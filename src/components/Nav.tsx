"use client";

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import { useCart } from './CartContext';

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount } = useCart();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setMounted(true);
  }, []);

  const linkClasses = (href: string) =>
    `nav-link ${pathname === href ? "active" : ""}`;

  const handleUserClick = () => {
    if (isLoggedIn) {
      router.push("/AccountCenter");
    } else {
      setOpenPopup(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`bg-[#333333] px-6 py-4 sticky top-0 z-50 mt-5 transition-all duration-300 ${
          isScrolled ? "md:mx-96" : "md:mx-40"
        } rounded-4xl`}
      >
        <div className="flex justify-between items-center text-white font-medium">
          <div className="flex items-center text-lg cursor-pointer">
            <Image src="/logo.png" height={30} width={30} alt="logo" />
            <p className="pl-5">First Step E-com</p>
          </div>

          <ul className="hidden md:flex space-x-12">
            <li><Link href="/" className={linkClasses("/")}>Home</Link></li>
            <li><Link href="/shop/Shop" className={linkClasses("/shop/Shop")}>Shop</Link></li>
            <li><Link href="/shop/myShop" className={linkClasses("/shop/myShop")}>My Shop</Link></li>
          </ul>

          <div className="hidden md:flex space-x-6">
            <Link href="/CheckOut" className="size-6 cursor-pointer list-none relative">
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer size-5 pt-1 list-none"
              onClick={handleUserClick}
            />
          </div>

          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 text-white">
            <div className="flex justify-between">
              <Link href="/" className={linkClasses("/")}>Home</Link>
              <Link href="/shop/Shop" className={linkClasses("/shop/Shop")}>Shop</Link>
              <Link href="/shop/myShop" className={linkClasses("/shop/myShop")}>My Shop</Link>
            </div>
            <div className="flex justify-between gap-5 mx-10">
              <FontAwesomeIcon icon={faCartShopping} className="cursor-pointer" />
              <FontAwesomeIcon icon={faUser} className="cursor-pointer" onClick={handleUserClick} />
            </div>
          </div>
        )}
      </nav>

      {openPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account</h2>
              <button onClick={() => setOpenPopup(false)} className="text-gray-600 hover:text-black text-xl">
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <AuthForm />
          </div>
        </div>
      )}

      <style jsx global>{`
        a.nav-link {
          position: relative;
          display: inline-block;
          color: white;
          text-decoration: none;
        }

        a.nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2px;
          width: 0%;
          background-color: white;
          transition: width 0.2s ease-in-out;
        }

        a.nav-link:hover::after,
        a.nav-link.active::after {
          width: 100%;
        }

        .input {
          @apply mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black;
        }
      `}</style>
    </>
  );
}

export default Nav;