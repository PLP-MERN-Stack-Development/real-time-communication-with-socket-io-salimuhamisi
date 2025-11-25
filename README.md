# Real-Time Chat Application with Socket.io

A real-time chat application built with **React**, **Node.js**, and **Socket.io**, demonstrating bidirectional communication between clients and server. The application supports global chat, private messaging, typing indicators, and online status updates.

---

## 🚀 Project Overview

This project implements a fully functional chat system with the following features:

- **Real-Time Messaging:** Send and receive messages instantly in global and private chats.
- **User Presence:** Display online/offline users and typing indicators.
- **Private Messaging:** One-on-one chat between users.
- **Notifications:** Alerts when users join/leave or receive messages.
- **Responsive Design:** Works across desktop and mobile devices.

---

## 📂 Project Structure

├── client/ # React front-end
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # UI components (ChatRoom, PrivateChat, UsersList)
│ │ ├── context/ # Theme/context providers
│ │ ├── hooks/ # Custom React hooks
│ │ ├── pages/ # Page components
│ │ ├── socket/ # Socket.io client setup
│ │ └── App.jsx # Main application
│ └── package.json # Client dependencies
├── server/ # Node.js back-end
│ ├── socket/ # Socket.io server logic
│ ├── utils/ # Utility functions
│ ├── server.js # Entry point
│ └── package.json # Server dependencies
└── README.md # Project documentation

## ⚡ Features Implemented

### Core Features
- Global chat room with message timestamps
- Typing indicators for active users
- Online/offline status tracking
- User join/leave notifications

### Advanced Features
- Private messaging between users
- Message alignment for sent/received messages
- Responsive and interactive UI using Tailwind CSS
- Auto-scrolling to latest messages

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js v18+
- npm or yarn
- Modern web browser

### Installation Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd socketio-chat

## 2. Install server dependencies
cd server
npm install

## 3. Install client dependencies
cd ../client
npm install

## 3. Run the development servers
# Server
cd ../server
npm run dev

# Client
cd ../client
npm run dev

## 5. Open your browser and navigate to http://localhost:5173 (or the port shown in console).

## APPLICATION SCREENSHOTS FOUND IN [project directory in the folder called "Application Screenshots"]