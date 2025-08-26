"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrompt() {
      const res = await fetch("/api/promptOne");
      const data = await res.json();
      console.log("Prompt One:", data.text);
      setPrompt(data.text);

      const htmlRes = await fetch("/api/promptTwo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: data.text }),
      });
      const htmlData = await htmlRes.json();
      console.log("Prompt Two (HTML):", htmlData.text);
      setHtml(htmlData.text);

      setLoading(false);
    }

    fetchPrompt();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 via-indigo-700 to-blue-900 text-white font-sans">
      <div className="text-center space-y-6">
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-8 border-t-transparent border-white animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-4 border-dashed border-white opacity-50 animate-ping"></div>
        </div>


        {/* Title */}
        <h1 className="text-3xl font-bold tracking-wider animate-pulse">
          Loading your experience...
        </h1>


        {/* Animated word cycling */}
        <div className="text-lg p-2 text-gray-200 w-[100vw]">
          Your website is going to be about{"\n"}
          <div className="ml-2 max-w-full overflow-x-scroll bg-gray-900 p-2 text-pink-400 font-semibold text-xs font-mono break-words whitespace-pre-wrap">
            <ReactMarkdown>{prompt}</ReactMarkdown>
          </div>
        </div>


      </div>


      <style jsx>{`
@keyframes slide {
0%, 20% { transform: translateY(0); opacity: 1; }
25%, 95% { transform: translateY(-100%); opacity: 0; }
100% { transform: translateY(0); opacity: 1; }
}
.animate-slide {
animation: slide 8s infinite;
}
`}</style>
    </div>
  );

  return (
    <div>
      <iframe
        className="w-full h-dvh"
        srcDoc={html}
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}
