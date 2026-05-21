import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../context/Context";

const Sidebar = () => {
  const {
    chats,
    currentChatId,
    newChat,
    selectChat,
    clearHistory,
    theme,
    toggleTheme,
  } = useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <img className="menu" src={assets.gemini_icon} alt="menu" />

        <div className="new-chat" onClick={newChat}>
          <img className="sidebar-icon" src={assets.plus_icon} alt="" />
          <p>New Chat</p>
        </div>

        <div className="recent">
          <p className="recent-title">Recent</p>

          <div className="recent-list">
            {chats.length === 0 ? (
              <p className="recent-empty">No chats yet</p>
            ) : (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`recent-entry ${
                    currentChatId === chat.id ? "active" : ""
                  }`}
                  onClick={() => selectChat(chat.id)}
                >
                  <img className="sidebar-icon" src={assets.message_icon} alt="" />
                  <p>{chat.title}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img className="sidebar-icon" src={assets.question_icon} alt="" />
          <p>Help</p>
        </div>

        <div className="bottom-item recent-entry" onClick={clearHistory}>
          <img className="sidebar-icon" src={assets.history_icon} alt="" />
          <p>Clear History</p>
        </div>

        <div className="bottom-item recent-entry theme-toggle" onClick={toggleTheme}>
          <img className="sidebar-icon" src={assets.bulb_icon} alt="" />
          <p>{theme === "light" ? "Dark Mode" : "Light Mode"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;