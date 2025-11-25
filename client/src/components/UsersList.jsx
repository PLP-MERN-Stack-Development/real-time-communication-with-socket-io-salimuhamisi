import React from "react";
import { useSocket } from "../socket/socket";

export default function UsersList({ onSelectUser }) {
  const { users, socket } = useSocket();

  return (
    <div className="w-52 bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">Online Users</h4>

      <ul className="space-y-2">
        {users
          .filter((u) => u.id !== socket.id) // hide yourself
          .map((u) => (
            <li
              key={u.id}
              className="px-2 py-1 bg-gray-100 rounded-md text-gray-700 text-sm cursor-pointer hover:bg-gray-200"
              onClick={() => onSelectUser(u)}   // ← Start private chat
            >
              {u.username}
            </li>
          ))}
      </ul>
    </div>
  );
}