import { FaBeer } from "react-icons/fa";
import {
  HomeView,
  ChatView,
  NotFound,
  ProtectiveRoute,
  SignIn,
  RenterChat,
  FavoritesView,
  ProfileView,
  MyAccount,
} from "./pages";
import { useEffect, useState } from "react";
import { getSecurityTokenFromLocalStorage } from "./utils/localStorage";
import usePreventPullToRefresh from "./utils/hooks/usePreventPullToRefresh.js";
import bcrypt from "bcryptjs";
import { store } from "./store.js";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

import history from "./utils/history";
import { Provider } from "react-redux";

function App() {
  const [isCover, setIsCover] = useState(false);

  usePreventPullToRefresh();
  useEffect(() => {
    checkSecurity();
  }, []);

  const checkSecurity = () => {
    const st = getSecurityTokenFromLocalStorage();
    if (st == null) {
      setIsCover(true);
    } else {
      const accessCode = import.meta.env.VITE_SECURITY_CODE;
      const hashedPassword = bcrypt.hashSync(
        accessCode,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );
      if (st != hashedPassword) {
        setIsCover(true);
      }
    }
  };

  const removeSecurityHandler = (status) => {
    setIsCover(status);
  };

  return (
    <HistoryRouter history={history}>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<ProtectiveRoute>{/* <Dashboard /> */}</ProtectiveRoute>}
          ></Route>

          <Route path="/landing" element={<HomeView />} />
          <Route path="/profile" element={<ProfileView />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="/favorites" element={<FavoritesView />} />
          <Route path="/chats" element={<RenterChat />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chat" element={<ChatView />}>
            {/* <Route path="/chat/:id" element={<ChatView />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </HistoryRouter>
  );
}

export default App;

//-------------------------------------
//-------------------------------------

// import React, { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import html2pdf from "html2pdf.js";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// export default function WebSocketStreamer() {
//   const [url, setUrl] = useState("ws://localhost:8000/ws/chat");
//   const [prompt, setPrompt] = useState("How is my brand performing ?");
//   const [response, setResponse] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [streamComplete, setStreamComplete] = useState(false);
//   const [isWaiting, setIsWaiting] = useState(false);
//   const [zoomLevel, setZoomLevel] = useState(1); // 1 = 100%
//   const [isPresentationMode, setIsPresentationMode] = useState(false);
//   const contentRef = useRef(null);
//   const outputRef = useRef(null);
//   const wsRef = useRef(null);

//   let rowIndex = -1;

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") setIsPresentationMode(false);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   const handleConnect = () => {
//     if (!url) return alert("Please provide a WebSocket URL");

//     const ws = new WebSocket(url);
//     wsRef.current = ws;

//     ws.onopen = () => {
//       setIsConnected(true);
//       setStreamComplete(false); // reset on reconnect
//       console.log("Connected to WebSocket");
//     };

//     ws.onmessage = (event) => {
//       const text = event.data;

//       // Stop the waiting indicator as soon as the first chunk arrives
//       setIsWaiting(false);

//       // Stop rendering when pipeline ends
//       if (text.includes("Pipeline run completed.")) {
//         console.log("Pipeline run completed.");

//         setStreamComplete(true);
//         return;
//       }

//       // // Skip metadata blocks
//       // const ignoreKeywords = [
//       //   "CONTEXT REPHRASER",
//       //   "MEMORY",
//       //   "SELECTER",
//       //   "ROUTER",
//       //   "TOOL CONTEXT LLM",
//       // ];

//       // // If the text contains any system keywords, ignore it
//       // if (ignoreKeywords.some((keyword) => text.includes(keyword))) {
//       //   return;
//       // }

//       // Otherwise, keep streaming it
//       setResponse((prev) => prev + text);
//     };

//     ws.onerror = (error) => {
//       console.error("WebSocket error:", error);
//     };

//     ws.onclose = () => {
//       setIsConnected(false);
//       console.log("WebSocket connection closed");
//     };
//   };

//   const handleSendPrompt = () => {
//     if (!isConnected || !prompt)
//       return alert("WebSocket must be connected and prompt provided");

//     setResponse("");
//     setStreamComplete(false);
//     setIsWaiting(true); // ✅ show loader
//     wsRef.current.send(prompt);
//   };

//   useEffect(() => {
//     if (!streamComplete && outputRef.current) {
//       outputRef.current.scrollTop = outputRef.current.scrollHeight;
//     }
//   }, [response, streamComplete]);

//   useEffect(() => {
//     if (streamComplete) {
//       console.log("update markdown here");
//     }
//   }, [streamComplete]);

//   return (
//     <div className="max-w-[1500px] mx-auto pt-10">
//       {/* <h1 className="text-2xl font-bold mb-4">WebSocket Prompt Streamer</h1> */}

//       <label className="block mb-2 font-semibold">URL : </label>
//       <div className="w-full flex items-center gap-2">
//         <input
//           type="text"
//           className="w-[500px] p-2 border rounded mb-4"
//           placeholder="ws://localhost:8000/ws"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />

//         <button
//           onClick={handleConnect}
//           className="w-[120px] bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
//         >
//           {isConnected ? "Connected" : "Connect"}
//         </button>
//       </div>

//       <label className="block mb-2 font-semibold">Prompt :</label>
//       <div className="w-full flex items-center gap-2">
//         <input
//           type="text"
//           className="w-[500px] p-2 border rounded mb-4"
//           placeholder="Enter your prompt"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           disabled={!isConnected}
//         />

//         <button
//           onClick={handleSendPrompt}
//           className="w-[120px] bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
//           disabled={!isConnected}
//         >
//           Send
//         </button>
//       </div>

//       <div className="flex justify-between items-center mb-4">
//         {/* Left: Waiting indicator */}
//         {isWaiting ? (
//           <div className="flex items-center gap-2 text-gray-600">
//             <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full" />
//             <span>Waiting for response...</span>
//           </div>
//         ) : (
//           <div /> // keep space so layout doesn't shift when it's hidden
//         )}

//         {/* Right: Control buttons */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setZoomLevel((prev) => Math.min(prev + 0.1, 2))}
//             className="w-12 px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
//           >
//             🔍+
//           </button>
//           <button
//             onClick={() => setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))}
//             className="w-12 px-2 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
//           >
//             🔎-
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="w-10 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//           >
//             🖨️
//           </button>
//           <button
//             onClick={() => {
//               if (!contentRef.current) return;
//               html2pdf()
//                 .from(contentRef.current)
//                 .set({
//                   margin: 0.5,
//                   filename: "report.pdf",
//                   image: { type: "jpeg", quality: 0.98 },
//                   html2canvas: { scale: 2 },
//                   jsPDF: {
//                     unit: "in",
//                     format: "letter",
//                     orientation: "portrait",
//                   },
//                 })
//                 .save();
//             }}
//             className="w-10 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//           >
//             📄
//           </button>
//           <button
//             onClick={() => setIsPresentationMode((prev) => !prev)}
//             className="w-10 px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
//           >
//             {isPresentationMode ? "❌" : "🖥️"}
//           </button>
//         </div>
//       </div>

//       <div
//         ref={outputRef}
//         className={`w-full h-[700px] mx-auto bg-gray-100 p-4 rounded border overflow-y-auto overflow-x-auto prose prose-sm sm:prose lg:prose-lg [&_h1]:my-2 [&_h1]:text-4xl [&_h2]:my-4 [&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:text-xl [&_p]:my-4 [&_table]:my-6
//           ${
//             isPresentationMode
//               ? "fixed inset-0 bg-white z-50 h-screen w-screen p-10"
//               : ""
//           }`}
//       >
//         <div
//           ref={contentRef}
//           style={{
//             transform: `scale(${zoomLevel})`,
//             transformOrigin: "top left",
//           }}
//         >
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             rehypePlugins={[rehypeRaw]}
//             components={{
//               img({ node, ...props }) {
//                 const [loading, setLoading] = useState(true);
//                 const isBase64 = props.src?.startsWith("data:image");

//                 let finalSrc = props.src;

//                 if (!finalSrc || finalSrc.trim() === "") {
//                   if (props.srcSet) {
//                     // Extract first URL from srcSet
//                     const firstCandidate = props.srcSet
//                       .split(",")[0]
//                       .trim()
//                       .split(" ")[0];
//                     finalSrc = firstCandidate;
//                   } else {
//                     console.warn("⚠️ Empty image src and no srcSet available.");
//                   }
//                 }

//                 return (
//                   <div className="relative w-full my-4">
//                     {loading && (
//                       <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded border">
//                         <div className="animate-spin h-6 w-6 border-2 border-gray-500 border-t-transparent rounded-full" />
//                       </div>
//                     )}
//                     <img
//                       loading="lazy"
//                       decoding="async"
//                       {...props}
//                       src={finalSrc}
//                       onLoad={() => setLoading(false)}
//                       className={`rounded shadow max-w-full transition-opacity duration-300 ${
//                         loading ? "opacity-0" : "opacity-100"
//                       } ${isBase64 ? "border" : ""}`}
//                       alt={props.alt || "Image"}
//                     />
//                   </div>
//                 );
//               },
//               table: ({ node, ...props }) => (
//                 <table
//                   className="w-full border-collapse table-auto"
//                   {...props}
//                 />
//               ),
//               thead: ({ node, ...props }) => (
//                 <thead className="bg-[#00000] text-left" {...props} />
//               ),
//               th: ({ node, ...props }) => (
//                 <th
//                   className="px-2 py-2 border-b border-blue-300 font-bold text-blue-700 text-sm whitespace-nowrap"
//                   {...props}
//                 />
//               ),
//               td: ({ node, ...props }) => (
//                 <td
//                   className="px-2 py-2 border-b border-blue-200 text-sm text-blue-800 whitespace-nowrap"
//                   {...props}
//                 />
//               ),
//               tr: ({ node, ...props }) => {
//                 rowIndex++;
//                 const isHeader = rowIndex === 0;
//                 const bgColor = isHeader
//                   ? ""
//                   : rowIndex % 2 === 0
//                   ? "bg-[#00000]"
//                   : "bg-[#d0ecea]";
//                 return <tr className={bgColor} {...props} />;
//               },
//             }}
//           >
//             {response}
//           </ReactMarkdown>

//           {/* <pre className="whitespace-pre-wrap font-mono text-sm text-black">
//             {response}
//           </pre> */}
//         </div>
//       </div>
//     </div>
//   );
// }
