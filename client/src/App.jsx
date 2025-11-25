import React, { useState } from 'react';
import { useSocket } from './socket/socket';
import ChatRoom from './components/ChatRoom';
import UsersList from './components/UsersList';
import PrivateChat from './components/PrivateChat';

function App() {
  const { connect } = useSocket();
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  // Selected user for private chat
  const [selectedUser, setSelectedUser] = useState(null);

  const handleJoin = () => {
    if (!username) return alert('Enter a username');
    connect(username);
    setJoined(true);
  };

  return (
    <div className="App min-h-screen flex items-center justify-center bg-gray-100 p-6">
      
      {/* LOGIN SCREEN */}
      {!joined ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-4">Enter Username</h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md mb-4 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button 
            onClick={handleJoin}
            className="w-full bg-blue-500 text-white py-2 rounded-md 
                       hover:bg-blue-600 transition"
          >
            Join Chat
          </button>
        </div>
      ) : (

        // MAIN CHAT UI
        <div className="flex w-full max-w-5xl gap-4">
          
          {/* Users */}
          <UsersList onSelectUser={setSelectedUser} />

          <div className="flex-1">
            {/* If a user is selected → show private chat */}
            {selectedUser ? (
              <PrivateChat 
                receiver={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            ) : (
              <ChatRoom />
            )}
          </div>

        </div>
      )}
    </div>
  );
}

export default App;
