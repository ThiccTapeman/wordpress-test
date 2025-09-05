import ActionButton from "@/components/ActionButton";
import { Code, Github, SquareGanttChart, User } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Image from "next/image";
import CodeDoc from "@/components/CodeDoc";

export default function Home() {
  return (
    <>
      <section className="p-4 bg-white text-black">
        <div className="container mx-auto">
          <div className="mt-40 mb-20">
            <h1 className="text-2xl md:text-6xl text-black mb-4 font-bold">
              WordPress API Integration
            </h1>
            <div className="mb-10 text-base md:text-xl">
              <p>
                This is a simple Next.js application demonstrating integration
                with the WordPress API.
              </p>
              <p className="mt-2">
                Use the navigation links above to explore posts and manage
                authentication.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <ActionButton href={"posts"} w={"w-full md:w-max"}>
                <SquareGanttChart />
                View Posts
              </ActionButton>
              <ActionButton
                href={"login"}
                secondaryInverted
                w={"w-full md:w-max"}>
                <User></User>Login
              </ActionButton>
              <ActionButton
                href={"https://github.com/ThiccTapeman/wordpress-test"}
                w={"w-full md:w-max"}
                secondary
                target={"_blank"}>
                <Github></Github>
                <p>Github</p>
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 bg-black text-white">
        <div className="container mx-auto">
          <div className="mt-10 mb-10 text-base md:text-xl">
            <h2 className="text-2xl md:text-5xl text-white mb-4 font-bold">
              About This Project
            </h2>
            <p>
              This project showcases how to connect a Next.js frontend with a
              WordPress backend using the WordPress REST API.
            </p>
            <p className="mt-2">
              It includes features for viewing, creating, editing, and deleting
              posts, as well as user authentication via NextAuth.js.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
