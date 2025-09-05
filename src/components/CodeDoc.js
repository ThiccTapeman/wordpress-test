import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeDoc({ title, description, code }) {
  return (
    <>
      <h3 className="text-2xl md:text-3xl text-black mb-4 font-bold mt-20">
        {title}
      </h3>
      <p className="mb-4 text-base md:text-xl">{description}</p>
      <div className="rounded-lg overflow-hidden border mt-10 border-gray-300">
        <SyntaxHighlighter
          language="javascript"
          style={atomOneDark}
          customStyle={{ padding: "25px 30px" }}>
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  );
}
