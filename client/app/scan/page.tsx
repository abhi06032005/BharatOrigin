"use client";

import { useEffect, useRef, useState } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from "recharts";
import {
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Send,
  RotateCcw,
  Sparkles,
  Search,
  ShieldAlert,
  Loader2,
  ArrowRight,
  TrendingDown,
  ShoppingBag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Product, ChemicalRisk } from "./scanProductData";

export default function ScanPage() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Input states
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  
  // Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // Chat states
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Manual fallback state
  const [manualBarcode, setManualBarcode] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  if (!isMounted) return null;

  // ─── Camera Logic ──────────────────────────────────────────────────────────
  const startCamera = async () => {
    setErrorMsg("");
    setPreviewImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraStream(stream);
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setErrorMsg("Could not access camera. Please upload an image from your gallery instead.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const captureSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setPreviewImage(dataUrl);
        stopCamera();
      }
    }
  };

  // ─── File Upload Logic ──────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── Product Analysis API Trigger ──────────────────────────────────────────
  const analyzeProduct = async () => {
    if (!previewImage) return;
    setIsAnalyzing(true);
    setNotFound(false);
    setErrorMsg("");
    setProduct(null);
    setChatMessages([]);

    const steps = [
      "Uploading Image to AI engine...",
      "Running multi-modal analysis...",
      "Identifying product packaging...",
      "Extracting ingredients and additives...",
      "Analyzing safety for toxic chemicals...",
      "Checking company Swadeshi index...",
      "Retrieving Indian alternatives..."
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        setAnalyzeStep(steps[stepIndex]);
        stepIndex++;
      }
    }, 900);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/shopping/scan-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: previewImage }),
      });

      clearInterval(interval);

      if (res.ok) {
        const data: Product = await res.json();
        setProduct(data);
        
        // Add greeting message to AI chat
        const greeting = `Hi! I've analyzed **${data.name}** by **${data.brand}**. It scores **${data.score}/100** on our Bharat Swadeshi Index. 
${
  data.harmfulChemicals && data.harmfulChemicals.length > 0
    ? `⚠️ I detected **${data.harmfulChemicals.length} harmful ingredient(s)**: ${data.harmfulChemicals.map(c => `**${c.name}**`).join(', ')}.`
    : `✅ Safe: No common harmful chemical additives were flagged in this scan.`
}
Ask me anything about its safety, health effects, or Indian options!`;
        setChatMessages([{ role: "assistant", content: greeting }]);
      } else {
        setErrorMsg("The AI could not confidently identify a consumer product in this image. Please ensure the label or ingredients are clearly visible and try again.");
      }
    } catch (err) {
      clearInterval(interval);
      console.error(err);
      setErrorMsg("Failed to connect to the analysis server. Please check your connection and try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ─── AI Chat Copilot Logic ──────────────────────────────────────────────────
  const handleSendChat = async (messageText?: string) => {
    const textToSend = messageText || chatInput;
    if (!textToSend.trim() || !product || isSendingChat) return;

    const newMessages = [...chatMessages, { role: "user" as const, content: textToSend }];
    setChatMessages(newMessages);
    if (!messageText) setChatInput("");
    setIsSendingChat(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/shopping/scan-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: chatMessages.slice(-6), // Send last few messages for context
          productContext: product
        })
      });

      if (res.ok) {
        const data = await res.json();
        setChatMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        setChatMessages([...newMessages, { role: "assistant", content: "I'm sorry, I encountered an error answering that. Please try again." }]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages([...newMessages, { role: "assistant", content: "Could not reach the assistant. Please check your server connection." }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // ─── Manual Barcode Fallback Trigger ───────────────────────────────────────
  const handleManualSearch = async () => {
    if (!manualBarcode.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setNotFound(false);
    setErrorMsg("");
    setProduct(null);
    setChatMessages([]);
    setAnalyzeStep("Checking registry for barcode...");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/api/shopping/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode: manualBarcode })
      });

      if (res.ok) {
        const data: Product = await res.json();
        setProduct(data);
        
        const greeting = `Hi! I found **${data.name}** via barcode search. It scores **${data.score}/100** on our Bharat Swadeshi Index. 
Ask me anything about its ingredients or Swadeshi alternatives!`;
        setChatMessages([{ role: "assistant", content: greeting }]);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to query barcode registry. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setPreviewImage(null);
    setProduct(null);
    setNotFound(false);
    setErrorMsg("");
    setChatMessages([]);
    stopCamera();
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900 font-sans antialiased pb-12">
      <div className="aurora-bg" />
      <div className="indian-pattern-overlay" />
      <div className="rangoli-corner rangoli-corner--tl" />
      <div className="rangoli-corner rangoli-corner--br" />
      
      <Navbar />

      {/* ─── SCANNED RESULTS DASHBOARD ─────────────────────────────────────── */}
      {product && !isAnalyzing && (
        <main className="max-w-6xl mx-auto px-6 py-12 mt-20 relative z-10 space-y-8 animate-fadeIn">
          
          {/* Main Product Info Banner */}
          <div className="glass-warm rounded-[2.5rem] p-8 border border-orange-200/50 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-orange-500/20">
                {product.category || "Consumer Product"}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">{product.name}</h2>
              <p className="text-lg text-slate-500 font-medium">{product.brand}</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur border border-white/60 p-5 rounded-3xl shadow-sm self-start md:self-auto">
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bharat Score</p>
                <p className={`text-4xl font-black ${product.isIndian ? "text-emerald-600" : "text-orange-600"}`}>
                  {product.score}/100
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className={`w-3.5 h-3.5 rounded-full ${product.isIndian ? "bg-emerald-500 shadow-[0_0_12px_#10b981]" : "bg-orange-500 shadow-[0_0_12px_#f97316]"}`} />
            </div>
          </div>

          {/* Core Dashboard Content Layout: Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: Scan Details (2/3 width) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Ownership & Origin Alert Banner */}
              <div className={`rounded-3xl border overflow-hidden shadow-sm ${
                product.isIndian 
                  ? "border-emerald-200 bg-emerald-50/50" 
                  : "border-red-200 bg-red-50/50"
              }`}>
                <div className={`px-6 py-4 flex items-center gap-3 text-white ${
                  product.isIndian 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500" 
                    : "bg-gradient-to-r from-red-600 to-rose-500"
                }`}>
                  {product.isIndian ? (
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                  )}
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Swadeshi Checker</p>
                    <h3 className="text-lg font-black tracking-tight">
                      {product.isIndian ? "Verified Indian-Owned Brand" : "Non-Indian Parent Company Flagged"}
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm font-semibold text-slate-700 leading-relaxed italic">
                    &ldquo;{product.about}&rdquo;
                  </p>
                  
                  {/* Detailed Ownership Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Owner / Parent", value: product.owner },
                      { label: "Manufacturing", value: product.origin },
                      { label: "Headquarters", value: product.headquarters || "Unknown" },
                      { label: "Global Revenue", value: product.revenue || "N/A" }
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/80 border border-slate-100 rounded-2xl p-3 shadow-sm">
                        <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">{label}</p>
                        <p className="text-xs font-bold text-slate-900 leading-snug truncate">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* HARMFUL CHEMICAL ANALYZER CARD */}
              <div className="glass rounded-[2rem] p-6 border border-white/60 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 border border-amber-200">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">Safety & Ingredients Analyzer</h3>
                    <p className="text-xs text-slate-500">Flags harmful chemicals, preservatives, and synthetics</p>
                  </div>
                </div>

                {product.harmfulChemicals && product.harmfulChemicals.length > 0 ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                        <strong>Chemical Alert:</strong> Our vision AI flagged <strong>{product.harmfulChemicals.length} additive(s)</strong> in the ingredients list that are commonly associated with skin irritation, health sensitivities, or industrial processing.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.harmfulChemicals.map((chem: ChemicalRisk, i: number) => (
                        <div key={i} className="p-4 bg-white/70 border border-red-100 rounded-2xl shadow-sm hover:border-red-200 transition-colors">
                          <p className="text-sm font-black text-rose-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            {chem.name}
                          </p>
                          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                            {chem.risk}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl flex items-center gap-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="text-sm font-black text-emerald-800">No Toxic Additives Flagged</h4>
                      <p className="text-xs text-emerald-600/80 font-medium mt-0.5 leading-relaxed">
                        This product's visible ingredients listing does not contain common synthetic toxins, parabens, sulphates, or harmful chemical preservatives analyzed by our engine.
                      </p>
                    </div>
                  </div>
                )}

                {/* Raw ingredients breakdown */}
                {product.ingredients && (
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2">Ingredients Scan Content</h4>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {product.ingredients}
                    </p>
                  </div>
                )}
              </div>

              {/* INDIAN / SWADESHI ALTERNATIVES */}
              {product.alternatives && product.alternatives.length > 0 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">Better Indian Alternatives</h3>
                      <p className="text-xs text-slate-500">100% Swadeshi choices where profits stay in India 🇮🇳</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {product.alternatives.map((alt, i) => (
                      <div key={i} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                        
                        {/* Image wrapper */}
                        <div className="relative h-32 bg-slate-50 overflow-hidden flex items-center justify-center p-3">
                          <img
                            src={alt.image_url}
                            alt={alt.name}
                            className="max-h-full max-w-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = `https://placehold.co/300x200/f0fdf4/16a34a?text=${encodeURIComponent(alt.brand)}`;
                            }}
                          />
                          <div className="absolute top-2 right-2 bg-emerald-50 border border-emerald-100 rounded-xl px-2 py-0.5 flex items-center gap-1 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span className="text-[8px] font-black text-emerald-700">BS {alt.bharat_score}</span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[8px] font-black uppercase text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                              {alt.brand}
                            </span>
                            <h4 className="text-xs font-extrabold text-slate-900 mt-1 leading-snug line-clamp-1">{alt.name}</h4>
                            <p className="text-[10px] text-slate-500 leading-normal mt-1 line-clamp-2">{alt.why}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-black text-slate-900">{alt.price}</span>
                            </div>
                            <a
                              href={alt.shop_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md hover:shadow-emerald-500/10"
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Ownership Mix & Chat Copilot */}
            <div className="space-y-6">
              
              {/* Ownership Mix & Economic Impact */}
              <div className="bg-slate-950 text-white p-6 rounded-[2rem] shadow-xl space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ownership & Economic Outflow</h3>
                
                <div className="h-36 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Indian", value: product.indianShare },
                          { name: "Foreign", value: product.foreignShare },
                        ]}
                        dataKey="value"
                        innerRadius={40}
                        outerRadius={56}
                        stroke="none"
                        paddingAngle={6}
                      >
                        <Cell fill="#06b6d4" />
                        <Cell fill="#334155" />
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none", backgroundColor: "#000", color: "#fff", fontSize: "10px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-between text-[10px] font-black uppercase tracking-wider border-t border-slate-800 pt-4">
                  <span className="text-cyan-400">Indian Share {product.indianShare}%</span>
                  <span className="text-slate-400">Foreign Outflow {product.foreignShare}%</span>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10 rounded-2xl flex gap-2">
                  <TrendingDown className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Buying this product sends estimated <strong className="text-red-400">₹{product.foreignShare} out of every ₹100 spent</strong> to foreign company assets, yielding local outflow.
                  </p>
                </div>
              </div>

              {/* AI CHAT COPILOT WIDGET */}
              <div className="glass rounded-[2rem] border border-white/60 shadow-xl overflow-hidden flex flex-col h-[520px]">
                <div className="px-5 py-4 bg-slate-900 text-white flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-extrabold">Safety & Origin Copilot</h4>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">Powered by Groq AI</p>
                  </div>
                </div>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm font-medium ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white rounded-tr-none"
                          : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
                      }`}>
                        {/* Format bold markers in message content */}
                        <div dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\n/g, '<br />')
                        }} />
                      </div>
                    </div>
                  ))}
                  {isSendingChat && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-2 shadow-sm">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        AI is thinking...
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Question Helper Chips */}
                <div className="px-3 py-2 border-t border-slate-100 bg-white flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none">
                  {[
                    "Is it safe for kids?",
                    "Chemical health risks?",
                    "Why is it non-Swadeshi?",
                    "Show Indian options"
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => handleSendChat(chip)}
                      disabled={isSendingChat}
                      className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full border border-slate-200 transition-colors disabled:opacity-50 shrink-0"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                  className="p-3 bg-white border-t border-slate-100 flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about chemicals, safety, alternatives..."
                    disabled={isSendingChat}
                    className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500 disabled:bg-slate-50"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || isSendingChat}
                    className="p-2.5 bg-slate-900 hover:bg-cyan-600 disabled:bg-slate-200 text-white rounded-xl transition-colors shrink-0 flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={reset}
                  className="flex-1 py-4 bg-slate-900 hover:bg-cyan-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Scan Next Product
                </button>
              </div>

            </div>

          </div>

        </main>
      )}

      {/* ─── UPLOAD AND CAPTURE PORTAL ────────────────────────────────────── */}
      {!product && !isAnalyzing && (
        <main className="max-w-4xl mx-auto px-6 py-12 mt-20 relative z-10 space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Multimodal Scan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Smart Product <span className="text-orange-600">Vision Analyzer</span>
            </h1>
            <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium">
              Upload any product packaging photo or ingredients label. Our AI checks for harmful chemical additives, flags foreign ownership, and finds Indian Swadeshi alternatives.
            </p>
          </div>

          {/* Interactive Input Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* CARD 1: Live Camera Snapshot Capture */}
            <div className="glass rounded-[2.5rem] border border-white/60 p-6 flex flex-col items-center justify-between shadow-xl min-h-[350px] relative overflow-hidden">
              
              {isCameraActive ? (
                <div className="w-full flex-1 flex flex-col justify-between gap-4">
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 bg-black">
                    <video ref={videoRef} className="w-full h-full object-cover" playsInline />
                    <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-orange-500/40 rounded-3xl m-4 flex items-center justify-center">
                      <div className="w-24 h-24 border border-white/20 rounded-full animate-pulse flex items-center justify-center">
                        <div className="w-12 h-12 border border-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={captureSnapshot}
                      className="flex-1 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md active:scale-[0.98]"
                    >
                      Capture Snapshot
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex-grow flex flex-col items-center justify-center gap-6 py-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600 animate-float-gentle">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-900">Use Device Camera</h3>
                    <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                      Snapshot product label directly from your phone/computer camera.
                    </p>
                  </div>
                  
                  <button
                    onClick={startCamera}
                    className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-orange-500/10 active:scale-95 flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Open Camera
                  </button>
                </div>
              )}
            </div>

            {/* CARD 2: File Upload Zone */}
            <div className="glass rounded-[2.5rem] border border-white/60 p-6 flex flex-col items-center justify-between shadow-xl min-h-[350px]">
              
              <div className="w-full flex-grow flex flex-col items-center justify-center gap-6 py-6 relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-20 h-20 rounded-[2rem] bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 animate-float-slow">
                  <Upload className="w-8 h-8" />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-extrabold text-slate-900">Upload Product Image</h3>
                  <p className="text-xs text-slate-500 max-w-[240px] mx-auto leading-relaxed">
                    Select a photo from your gallery, photo library, or drag & drop.
                  </p>
                </div>
                
                <button
                  type="button"
                  className="px-8 py-3.5 bg-slate-950 hover:bg-cyan-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md active:scale-95 flex items-center gap-2 pointer-events-none"
                >
                  <Upload className="w-4 h-4" />
                  Choose File
                </button>
              </div>
            </div>

          </div>

          {/* Snapshot Preview & Analyze Action Panel */}
          {previewImage && !isCameraActive && (
            <div className="glass rounded-[2.5rem] p-6 border border-white/60 shadow-xl flex flex-col md:flex-row items-center gap-6 animate-fadeIn">
              <div className="relative w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 flex items-center justify-center">
                <img src={previewImage} alt="Scanned Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left w-full">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Image Loaded Successfully</h3>
                  <p className="text-xs text-slate-500">Verify ingredients label, packaging, or brand tags are clear before starting.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={analyzeProduct}
                    className="flex-grow py-4 bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-2"
                  >
                    Analyze Product
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold text-xs uppercase tracking-widest rounded-2xl transition-all"
                  >
                    Clear Photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-700 rounded-3xl flex items-start gap-3 text-xs leading-relaxed font-semibold">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <p className="font-black text-sm text-red-800">Scan Unsuccessful</p>
                <p className="mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Manual Barcode Search Fallback Option */}
          <div className="pt-6 border-t border-slate-200/60 max-w-sm mx-auto flex flex-col gap-3">
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center">Manual Barcode Registry Search</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                placeholder="Enter EAN/UPC barcode number..."
                className="flex-grow bg-white/50 border border-slate-200 rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-cyan-500 font-mono shadow-sm"
              />
              <button
                onClick={handleManualSearch}
                disabled={!manualBarcode.trim() || isAnalyzing}
                className="px-5 py-3 bg-slate-950 hover:bg-cyan-600 disabled:opacity-50 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

        </main>
      )}

      {/* ─── LOADING SCAN STEPS OVERLAY ──────────────────────────────────── */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 gap-6 animate-fadeIn">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-[4px] border-slate-100" />
            <div className="absolute inset-0 rounded-full border-[4px] border-t-orange-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-orange-600 animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2 max-w-xs">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">{analyzeStep || "Processing image..."}</h2>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              Groq Multimodal Vision Engine is running safety compliance audits.
            </p>
          </div>
          
          <div className="flex gap-1.5 mt-2">
            {["Uploading Image", "Running Vision OCR", "Verifying Safety"].map((s, idx) => (
              <div
                key={s}
                className={`h-1 w-10 rounded-full transition-all duration-500 ${
                  analyzeStep.toLowerCase().includes(s.toLowerCase().substring(0, 10))
                    ? "bg-orange-600"
                    : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ─── NOT FOUND SCREEN ──────────────────────────────────────────────── */}
      {notFound && !isAnalyzing && (
        <div className="h-screen flex flex-col items-center justify-center p-8 bg-white text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center mb-8">
            <AlertTriangle className="w-10 h-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Barcode Not Found</h2>
          <p className="text-xs text-slate-500 mt-2 max-w-xs leading-relaxed font-medium">
            The barcode number <span className="font-bold underline text-slate-900">{manualBarcode}</span> was not recognized in our Swadeshi registry database.
          </p>
          <div className="mt-8 space-y-3 w-full max-w-xs">
            <button
              onClick={reset}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-xs uppercase tracking-widest hover:bg-cyan-600 transition-all shadow-md active:scale-95"
            >
              Go Back
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* Hide scrollbars for chips slider */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}