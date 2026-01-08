import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-base-100 shadow-sm sticky  top-0 z-50">
      <div className="navbar  max-w-7xl mx-auto w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
                {/* <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul> */}
              </li>
              {/* <li>
                <a href="#testimonials">Testimonials</a>
              </li> */}
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              viewBox="0 0 24 24"
              className="text-blue-600"
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
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-lg font-medium menu-horizontal px-1">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
              {/* <details>
                <summary>Pricing</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details> */}
            </li>
            {/* <li>
              <a href="#testimonials">Testimonials</a>
            </li> */}
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <Link href={"/login"} className="btn btn-primary rounded-lg">
              Login
            </Link>
            <Link
              href={"/signup"}
              className="btn btn-outline btn-success rounded-lg"
            >
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
