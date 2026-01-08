import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-neutral-content p-10">
      <div className="max-w-7xl mx-auto">
        <div className="footer sm:footer-horizontal mb-5">
          <aside className="">
            <div className="flex items-center gap-2 text-xl font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={34}
                height={34}
                viewBox="0 0 24 24"
                className="text-blue-400"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                >
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6"></path>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                </g>
              </svg>
              BarPrime
            </div>
            <p className="max-w-md mt-2 mb-4">
              Empowering aspiring lawyers to achieve their dreams through
              comprehensive bar exam preparation and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/p/BarPrime-Prep-Center-61565963311421/"
                aria-label="Facebook"
                target="_blank"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              {/* <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a> */}
            </div>
          </aside>
          <nav>
            <h6 className="footer-title opacity-100">Company</h6>
            <Link
              href="#services"
              className="link link-hover opacity-60 hover:opacity-100"
            >
              Services
            </Link>
            <Link
              href="#pricing"
              className="link link-hover opacity-60 hover:opacity-100"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="link link-hover opacity-60 hover:opacity-100"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="link link-hover opacity-60 hover:opacity-100"
            >
              Contact Us
            </Link>
          </nav>
          {/* <nav>
            <h6 className="footer-title opacity-100">Resources</h6>
            <a className="link link-hover">Study Materials</a>
            <a className="link link-hover">Practice Tests</a>
            <a className="link link-hover">Blog</a>
            <a className="link link-hover">FAQ</a>
          </nav> */}
          <nav>
            <h6 className="footer-title opacity-100">Support</h6>
            <Link href="#contact" className="link link-hover">
              Contact Us
            </Link>
          </nav>
          <nav>
            <h6 className="footer-title opacity-100">Legal</h6>
            <Link href="/privacy-policy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="link link-hover">
              Terms of Use
            </Link>
            {/* <Link href="/cookie-policy" className="link link-hover">
              Cookie policy
            </Link> */}
          </nav>
        </div>
        <br />
        <div className="border-t-2 border-gray-500 my-5"></div>
        <div className="flex justify-between">
          <div>© 2025 BarPrime. All rights reserved.</div>
          <div>Made with ❤️ for aspiring lawyers</div>
        </div>
      </div>
    </footer>
  );
}
