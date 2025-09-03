import Image from "next/image";

export default function Home() {
  return (
    <section className="p-4 bg-gray-100 min-h-screen text-black">
      <div className="container mx-auto">
        <h1 className="text-2xl text-black mb-4">Welcome to the WordPress API Integration App</h1>
        <p>This is a simple Next.js application demonstrating integration with the WordPress API.</p>
        <p className="mt-2">Use the navigation links above to explore posts and manage authentication.</p>
      </div>
    </section>
  );
}
