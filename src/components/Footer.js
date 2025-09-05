import Link from "next/link";
import React from "react";

const Footer = () => (
  <footer className="p-4 bg-black text-white py-3 shadow-sm">
    <div className="container mx-auto text-center flex gap-2 mt-10 mb-10">
      <p>© {new Date().getFullYear()} by </p>
      <Link href="https://alexanderhellsten.se" target="_blank">
        alexanderhellsten.se
      </Link>
    </div>
  </footer>
);

export default Footer;
