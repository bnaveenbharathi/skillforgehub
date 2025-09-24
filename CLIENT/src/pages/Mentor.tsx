import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const GEMINI_API_KEY = "AIzaSyCLc6oput4szDIc1D4_rZu3Sca_kq4dGsI";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
  GEMINI_API_KEY;

function formatResponse(responseText) {
  if (!responseText) return "";
  let formatted = responseText.replace(/gemini/gi, "MarkGPT").replace(/google/gi, "NERD NINJA");
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  return formatted.split("\n").join("<br>");
}

function customResponse(question) {
  const q = question.toLowerCase();
  if (q.includes("your name") || q.includes("what is your name")) {
    return "My name is G-AI.";
  }
  return null;
}

const Mentor = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your AI mentor. Ask me anything about learning, careers, or skills!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    // Custom static responses
    const custom = customResponse(input);
    if (custom) {
      setMessages((msgs) => [...msgs, { sender: "ai", text: custom }]);
      setLoading(false);
      return;
    }

    // Gemini API call
    try {
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }],
        }),
      });

      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.candidates?.[0]?.output ||
        "Sorry, I couldn't understand that.";

      setMessages((msgs) => [...msgs, { sender: "ai", text: formatResponse(aiText) }]);
    } catch (err) {
      console.error("Gemini error:", err);
      setMessages((msgs) => [...msgs, { sender: "ai", text: "Error connecting to AI." }]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Navbar */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gradient">SkillForge Hub</span>
            </Link>
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div
          className="w-full max-w-xl mx-auto bg-white/80 rounded-3xl shadow-lg p-6 flex flex-col"
          style={{ minHeight: 500 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">AI Mentor Chat</h2>
          <div className="flex-1 overflow-y-auto mb-4 pr-1" style={{ maxHeight: 350 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`my-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[80%] ${
                    msg.sender === "user" ? "bg-primary text-white" : "bg-accent text-foreground"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 rounded-xl border border-border focus:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !input.trim()}>
              {loading ? "Thinking..." : "Send"}
            </Button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Mentor;
