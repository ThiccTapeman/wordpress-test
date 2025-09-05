import ActionButton from "@/components/ActionButton";

export default function Docs() {
  return (
    <>
      <section className="p-4 bg-white text-black">
        <div className="container mx-auto mt-20">
          <div className="mt-5 text-base md:text-xl">
            <h2 className="text-2xl md:text-5xl mb-4 font-bold">Quick Links</h2>
            <div className="flex gap-3 mb-5 flex-wrap">
              <ActionButton href={"/docs/auth"}>
                OAuth2 Documentation
              </ActionButton>
              <ActionButton href={"/docs/posts"}>
                Posts Documentation
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 bg-black text-white">
        <div className="container mx-auto">
          <div className="mt-5 mb-5">
            <h2 className="text-3xl md:text-5xl font-bold">Resources</h2>
          </div>
          <div className="flex gap-3 flex-wrap">
            <ActionButton
              secondary={true}
              href="https://next-auth.js.org/providers/wordpress"
              target="_blank">
              NextAuth.js WordPress Provider Docs
            </ActionButton>
            <ActionButton
              secondary={true}
              href="https://developer.wordpress.com/docs/oauth2/"
              target="_blank">
              WordPress OAuth2 Docs
            </ActionButton>
            <ActionButton
              secondary={true}
              href="https://developer.wordpress.com/docs/api/"
              target="_blank">
              WordPress REST API Docs
            </ActionButton>
          </div>
        </div>
      </section>
    </>
  );
}
