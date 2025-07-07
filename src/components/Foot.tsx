import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

function Foot() {
    return (
        <>
            <footer className="w-full bg-[#333333] text-white px-6 py-4 md:px-16 md:py-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <Link href='' className='nav-link cursor-pointer'>Our Story</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>Careers</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>Store Locations</Link>
                            <br />
                            <Link href='/about/Terms&Conditions' className='nav-link cursor-pointer'>Terms & Conditions</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Customer Service</h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <Link href='/CustomerService/ContactUs' className='nav-link cursor-pointer'>Contact Us</Link>
                            <br />
                            <Link href='/CustomerService/FAQs' className='nav-link cursor-pointer'>FAQs</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>Shipping & Returns</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>Size Guide</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">My Account</h2>
                        <div className="space-y-2 text-sm md:text-base">
                            <Link href='/MyAccount/Auth/' className='nav-link cursor-pointer'>Sign In</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>View Wishlist</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>Track My Order</Link>
                            <br />
                            <Link href='' className='nav-link cursor-pointer'>My Shop</Link>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
                        <div className="space-y-3 text-sm md:text-base">
                            <Link href='' className="flex items-center gap-3 cursor-pointer nav-link">
                                <FontAwesomeIcon className="w-5 h-5" icon={faFacebook} /> Facebook
                            </Link>
                            <br />
                            <Link href='' className="flex items-center gap-3 cursor-pointer nav-link">
                                <FontAwesomeIcon className="w-5 h-5" icon={faInstagram} /> Instagram
                            </Link>
                            <br />
                            <Link href='' className="flex items-center gap-3 cursor-pointer nav-link">
                                <FontAwesomeIcon className="w-5 h-5" icon={faXTwitter} /> Twitter
                            </Link>
                            <br />
                            <Link href='' className="flex items-center gap-3 cursor-pointer nav-link">
                                <FontAwesomeIcon className="w-5 h-5" icon={faPinterest} /> Pinterest
                            </Link>
                        </div>
                    </div>
                </div>
                <br />
                <div className='text-center'>© 2025 First Step E-Com. All rights reserved.</div>
            </footer>

            <style>
                {`
                    .nav-link {
                        position: relative;
                        display: inline-block;
                    }

                    .nav-link::after {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: -2px;
                        height: 2px;
                        width: 0%;
                        background-color: white;
                        transition: width 0.3s ease-in-out;
                    }

                    .nav-link:hover::after {
                        width: 100%;
                    }
                `}
            </style>
        </>
    );
}

export default Foot;