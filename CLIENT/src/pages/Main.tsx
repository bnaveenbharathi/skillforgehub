import React from "react";
import { Link } from "react-router-dom";
import mainImg from "../assets/main.png";
import IconImg from "../assets/icon.png";


const fadeIn = {
  animation: 'fadeIn 1.2s ease',
};
const slideInLeft = {
  animation: 'slideInLeft 1.2s cubic-bezier(0.23,1,0.32,1)',
};
const slideInRight = {
  animation: 'slideInRight 1.2s cubic-bezier(0.23,1,0.32,1)',
};

const Main = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {/* Left Side: Illustration */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)",
          ...slideInLeft,
        }}
      >
        <img
          src={mainImg}
          alt="Learning Collaboration Illustration"
          style={{
            maxWidth: "80%",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: "2rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            background: "#fff",
            ...fadeIn,
          }}
        />
      </div>
      {/* Right Side: Title & Slogan */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          ...slideInRight,
        }}
      >
        <img
          src={IconImg}
          className='w-50 h-40'
          alt="Learning Collaboration Illustration"
          style={{
        
            ...fadeIn,
          }}
        />
        <h1 className="text-sky-500"
          style={{
            fontSize: "3rem",
            fontWeight: 800,
            letterSpacing: "-2px",
            marginBottom: "1.5rem",
            fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
            textShadow: "0 2px 8px rgba(30,41,59,0.08)",
          }}
        >
          SkillForge Hub
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#475569",
            fontWeight: 500,
            textAlign: "center",
            maxWidth: "28rem",
            lineHeight: 1.4,
          }}
        >
          Bridging Skills to Opportunities
        </p>
        <Link to='/main' style={{ marginTop: '2rem', textDecoration: 'none' }}>
        <button className="py-2 rounded border-2 border-orange-800 px-10 uppercase text-sky-950 bg-sky-400">
            Launch Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Main
