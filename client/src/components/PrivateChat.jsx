import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../socket/socket";

export default function PrivateChat({ receiver, onClose }) {
  const { messages, sendPrivateMessage, socket } = useSocket();
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const myId = socket.id;

  // Filter private messages between ME and RECEIVER
  const privateMessages = messages.filter(
    (m) =>
      m.isPrivate &&
      (m.senderId === receiver.id ||
        m.receiverId === receiver.id ||
        m.senderId === myId)
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [privateMessages]);

  const handleSend = () => {
    if (!text.trim()) return;
    sendPrivateMessage(receiver.id, text);
    setText("");
  };

  return (
    <div className="border border-blue-600 bg-gray-800 text-white p-4 rounded-lg w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">
          Chat with{" "}
          <span className="text-blue-400">{receiver.username}</span>
        </h3>

        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-600 text-xl"
        >
          ✖
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="h-72 overflow-y-auto bg-gray-900 p-3 rounded-md space-y-3">
        {privateMessages.map((msg) => {
          const isMe = msg.senderId === myId;

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[75%] ${
                isMe ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              {/* Sender name */}
              <span className="text-xs text-gray-400">
                {isMe ? "You" : msg.sender}
              </span>

              {/* Bubble */}
              <div
                className={`px-3 py-2 rounded-xl text-sm ${
                  isMe
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-gray-500 mt-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        <div ref={messagesEndRef}></div>
      </div>

      {/* INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a private message..."
          className="flex-1 px-3 py-2 rounded bg-gray-700 border border-gray-600 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}