import React from 'react';
import img from '/favicon.png'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10">
      <div className="max-w-6xl px-5 mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Company Info */}
        <aside className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-4">
            <img src={img} alt="" />
          </div>
          <p className="text-sm">
            DevPlanner Industries Ltd.
            <br />
            Providing reliable tech since 2022
          </p>
        </aside>

        {/* Services
        <nav className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold mb-2">Services</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">Branding</a></li>
            <li><a className="link link-hover">Design</a></li>
            <li><a className="link link-hover">Marketing</a></li>
            <li><a className="link link-hover">Advertisement</a></li>
          </ul>
        </nav> */}

        {/* Company */}
        <nav className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold mb-2">Company</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">About us</a></li>
            <li><a className="link link-hover">Contact</a></li>
            <li><a className="link link-hover">Jobs</a></li>
            <li><a className="link link-hover">Press kit</a></li>
          </ul>
        </nav>

        {/* Legal */}
        <nav className="w-full md:w-1/2 lg:w-1/4 text-center md:text-left">
          <h6 className="footer-title text-lg font-semibold mb-2">Legal</h6>
          <ul className="space-y-1">
            <li><a className="link link-hover">Terms of use</a></li>
            <li><a className="link link-hover">Privacy policy</a></li>
            <li><a className="link link-hover">Cookie policy</a></li>
          </ul>
        </nav>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm border-t py-4">
        © {new Date().getFullYear()} DevPlanner . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
