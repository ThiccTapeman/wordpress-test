"use client";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="p-4 bg-white text-black py-3 shadow-sm fixed top-0 w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-normal">WP API</h1>
          <div className="flex gap-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/posts" className=" hover:underline">
              Posts
            </Link>
            <Link href="/docs" className=" hover:underline">
              Docs
            </Link>
            <Link href="/login" className=" hover:underline">
              Login
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
