import React, { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../context/Context";

const Main = () => {
  const { input, setInput, onSent, loading, currentChat, messages } =
    useContext(Context);

  const bottomRef = useRef(null);
  const profileRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <p>Dextra</p>

        <div className="profile-container" ref={profileRef}>
          <img
            src={assets.user_icon}
            alt="user"
            className="profile-icon"
            onClick={() => setShowMenu((prev) => !prev)}
          />

          {showMenu && (
            <div className="profile-menu">
              <div className="profile-top">
                <img src={assets.user_icon} alt="profile" />
                <div>
                  <h4>DEV</h4>
                  <p>dextra-user</p>
                </div>
              </div>

              <div className="menu-item">⚙️ Settings</div>
              <div className="menu-item logout">🚪 Logout</div>
            </div>
          )}
        </div>
      </div>

      <div className="main-container">
        <div className="chat-scroll">
          {!currentChat || messages.length === 0 ? (
            <div className="greet">
              <p>
                <span>Hello, DEV</span>
              </p>
              <p>How can I help you today?</p>
            </div>
          ) : (
            <div className="conversation">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    msg.role === "user" ? "user" : "assistant"
                  }`}
                >
                  <div className="message-bubble">
                    {msg.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message-row assistant">
                  <div className="message-bubble">
                    <p>Thinking...</p>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSent();
              }}
            />

            <div>
              <img className="input-icon" src={assets.gallery_icon} alt="" />
              <img className="input-icon" src={assets.mic_icon} alt="" />
              <img
                className="input-icon"
                src={assets.send_icon}
                alt="send"
                onClick={() => onSent()}
              />
            </div>
          </div>

          <p className="bottom-info">
            Dextra may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;