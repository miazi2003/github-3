import React from 'react';
import logo from "../../assets/logo.png"
const Footer = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <footer className="footer sm:footer-horizontal bg-navy-500 text-white p-10 w-full shadow-sm">
        <aside>
          <img src={logo} alt="ROAVIA Logo" className="w-24 h-24" />
          <p className="text-lg font-bold">ROAVIA</p>
          <p className="text-sm text-gray-300">Exploring Beyond Limits</p>
          <p className="text-xs text-gray-400">© 2025 ROAVIA. All rights reserved.</p>
        </aside>

        <nav>
          <h6 className="footer-title">Follow the Developer</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.37 7.86 10.89.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.3-1.28-1.64-1.28-1.64-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.53-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.46-2.28 1.2-3.08-.12-.29-.52-1.46.12-3.04 0 0 .97-.31 3.18 1.17.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.48 3.17-1.17 3.17-1.17.65 1.58.25 2.75.12 3.04.75.8 1.2 1.82 1.2 3.08 0 4.45-2.71 5.42-5.29 5.7.42.36.79 1.06.79 2.14v3.17c0 .31.21.68.79.56C20.71 21.37 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M4.98 3.5C4.98 2.12 6.09 1 7.5 1s2.52 1.12 2.52 2.5S8.91 6 7.5 6 4.98 4.88 4.98 3.5zM2 8h5v14H2V8zm7.5 0h4.5v2h.07c.63-1.2 2.18-2.46 4.43-2.46C22 7.54 23 10 23 13.25V22h-5V13.5c0-2.04-.04-4.67-3-4.67-3 0-3.46 2.24-3.46 4.54V22H9V8z"/>
              </svg>
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.18 9.18 0 01-2.89 1.1A4.52 4.52 0 0016.5 0c-2.53 0-4.58 2.08-4.58 4.64 0 .36.04.71.12 1.05C7.69 5.5 4.1 3.66 1.67.7A4.64 4.64 0 00.9 3.32c0 1.6.8 3.01 2.01 3.84A4.38 4.38 0 01.96 6v.05c0 2.23 1.58 4.09 3.69 4.51a4.52 4.52 0 01-2.05.08c.57 1.81 2.24 3.13 4.21 3.17A9.05 9.05 0 010 19.54a12.88 12.88 0 007.29 2.16c8.75 0 13.55-7.4 13.55-13.82 0-.21 0-.42-.02-.62A9.95 9.95 0 0023 3z"/>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
