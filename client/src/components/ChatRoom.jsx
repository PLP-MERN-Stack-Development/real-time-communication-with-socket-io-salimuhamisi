import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../socket/socket';

export default function ChatRoom() {
  const { messages, sendMessage, typingUsers, setTyping, socket } = useSocket();
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  const myId = socket.id;

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage(text);
    setText('');
    setTyping(false);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 border border-gray-700 p-4 rounded-lg bg-gray-800 text-white">
      <h3 className="text-xl font-semibold mb-3">Global Chat</h3>

      {/* Messages Container */}
      <div className="h-72 overflow-y-auto mb-4 p-3 bg-gray-900 rounded-lg space-y-3">
        {messages.map((msg) => {
          if (msg.system) {
            return (
              <div key={msg.id} className="text-sm text-gray-400 italic">
                {msg.timestamp && <div className="mb-1">{msg.timestamp}</div>}
                <div>{msg.message}</div>
              </div>
            );
          }

          const isMe = msg.senderId === myId;

          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[75%] ${
                isMe ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              {/* Sender */}
              <span className="text-xs text-gray-400">
                {isMe ? 'You' : msg.sender}
              </span>

              {/* Message bubble */}
              <div
                className={`px-3 py-2 rounded-xl text-sm ${
                  isMe
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {msg.message}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-gray-500 mt-1">{msg.timestamp}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setTyping(!!e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 rounded-md bg-gray-700 border border-gray-600 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 
                     transition font-semibold"
        >
          Send
        </button>
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <p className="mt-2 text-sm text-gray-400">
          {typingUsers.join(', ')} is typing...
        </p>
      )}
    </div>
  );
}