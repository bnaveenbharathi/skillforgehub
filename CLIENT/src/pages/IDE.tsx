import { useEffect, useState } from "react";
import "./ide.css";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";

import Ghost from './assets/ghost.mp4'; 

const socket = io("https://realtime-code-editor-zwp3.onrender.com");

const IDE = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// start code here");
  const [copySuccess, setCopySuccess] = useState("");
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [theme, setTheme] = useState("vs-dark");
  const [wordWrap, setWordWrap] = useState<"off" | "on" | "wordWrapColumn" | "bounded">("off");
  const [showCard, setShowCard] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handleButtonClick = () => {
    setShowVideo(true);
  };

  const handleClose = () => {
    setShowVideo(false);
  }


  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  useEffect(() => {
    socket.on("userJoined", (users) => {
      setUsers(users);
    });

    socket.on("codeUpdate", (newCode) => {
      setCode(newCode);
    });

    socket.on("userTyping", (user) => {
      setTyping(`${user.slice(0, 8)}... is Typing`);
      setTimeout(() => setTyping(""), 2000);
    });

    socket.on("languageUpdate", (newLanguage) => {
      setLanguage(newLanguage);
    });

    return () => {
      socket.off("userJoined");
      socket.off("codeUpdate");
      socket.off("userTyping");
      socket.off("languageUpdate");
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      socket.emit("leaveRoom");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const joinRoom = async () => {
    const finalRoomId = roomId || "1";
    const finalUserName = userName || "mark";
    socket.emit("join", { roomId: finalRoomId, userName: finalUserName });
    setJoined(true);
    setRoomId(finalRoomId);
    setUserName(finalUserName);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: finalRoomId, userName: finalUserName }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error saving user:", data.message);
      }
    } catch (error) {
      console.error("Failed to send user data:", error);
    }
  };

  const leaveRoom = () => {
    socket.emit("leaveRoom");
    setJoined(false);
    setRoomId("");
    setUserName("");
    setCode("// start code here");
    setLanguage("javascript");
    setOutput("");
    setError("");
    setAiFeedback("");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 2000);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeChange", { roomId, code: newCode });
    socket.emit("typing", { roomId, userName });
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    socket.emit("languageChange", { roomId, language: newLanguage });
  };

  const runCode = async () => {
    if (language !== "javascript") {
      setOutput("⚠️ Execution only works for JavaScript in the browser.");
      setError("");
      setAiFeedback("");
      return;
    }
    try {
      let logs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(" "));
        originalConsoleLog(...args);
      };

      eval(code);

      console.log = originalConsoleLog;
      setOutput(logs.join("\n") || "Write some code");
      setError("");
      setAiFeedback("");
    } catch (error) {
      const errorMessage = `❌ Error: ${error.message}`;
      setOutput("");
      setError(errorMessage);

      try {
        console.log("Sending request to backend:", { code, error: errorMessage });
        const response = await fetch("http://localhost:5000/check_js", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, error: errorMessage }),
        });
        console.log("Backend response status:", response.status);
        const data = await response.json();
        console.log("Backend response data:", data);
        if (response.ok) {
          setAiFeedback(data.feedback || "No AI feedback available.");
        } else {
          setAiFeedback("Failed to get AI feedback: " + data.error);
        }
      } catch (err) {
        setAiFeedback("Error contacting backend: " + err.message);
        console.error("Fetch error details:", err);
      }
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_F, () => {
      editor.getAction("actions.find").run();
    });
  };


  
  return (
    <div className="editor-container">
      <div className="sidebar">
        <div className="room-info">
          <h2>Code Room: {roomId}</h2>
          <button onClick={copyRoomId} className="copy-button">
            Copy Id
          </button>
          {copySuccess && <span className="copy-success">{copySuccess}</span>}
        </div>
        <h3>Users in Room:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.slice(0, 8)}...</li>
          ))}
        </ul>
        <p className="typing-indicator">{typing}</p>
        <select
          className="language-selector"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="javascript">JavaScript</option>
        </select>
        <div className="editor-settings">
          
        </div>
        <button className="leave-button" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>

      <div className="editor-wrapper">
        <Editor
          height={"90vh"}
          defaultLanguage={language}
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
           
          }}
          onMount={handleEditorDidMount}
        />
      </div>

      <div className="output-box">
        <h3>Output:</h3>
        <pre>{output}</pre>
        <button className="run-button" onClick={runCode}>
          Run Code
        </button>

        
         <button className="open-btn" onClick={() => setShowCard(true)}>
        Show Error
      </button>

      {showCard && (
        <div className="card-overlay">
          <div className="card">
            <button className="close-btn" onClick={() => setShowCard(false)}>
              &times;
            </button>
             <div className=" franklin-gothic-heavy">
          <h3>This is your mistake:</h3>
          <pre className="pre-error" >{error}</pre>
          <h3>AI Feedback:</h3>
          <pre className="pre-ai" >{aiFeedback}</pre>
        </div>
            

          </div>
        </div>
      )}
    


 {/* <button className="trigger-btn" onClick={handleButtonClick}>
        Don't touch this
      </button>

       {showVideo && (
        <div className="video-overlay">
          <video autoPlay controls className="video-fullscreen">
            <source src={Ghost} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className="close-btn" onClick={() => setShowVideo(false)}>✖</button>
        </div>
      )} */}



      </div>
    </div>
  );
};

export default IDE;


