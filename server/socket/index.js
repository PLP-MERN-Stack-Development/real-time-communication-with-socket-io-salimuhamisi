// socket/index.js
const users = {};
const messages = [];
const typingUsers = {};

function formatDate(date) {
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31 ? "st" :
    day === 2 || day === 22 ? "nd" :
    day === 3 || day === 23 ? "rd" :
    "th";

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${day}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}`;
}


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins chat
    socket.on('user_join', (username) => {
      users[socket.id] = { username, id: socket.id };
      io.emit('user_list', Object.values(users));
      io.emit('user_joined', { 
        username, 
        id: socket.id, 
        timestamp: formatDate(new Date()) 
      });
    });

    // Send global message
    socket.on('send_message', ({ message }) => {
      const msg = {
        id: Date.now(),
        message,
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
      };
      messages.push(msg);
      if (messages.length > 100) messages.shift();
      io.emit('receive_message', msg);
    });

    // Typing indicator
    socket.on('typing', (isTyping) => {
      if (!users[socket.id]) return;
      const username = users[socket.id].username;
      if (isTyping) typingUsers[socket.id] = username;
      else delete typingUsers[socket.id];
      io.emit('typing_users', Object.values(typingUsers));
    });

    // Private messaging
    socket.on('private_message', ({ to, message }) => {
      const msg = {
        id: Date.now(),
        message,
        sender: users[socket.id]?.username || 'Anonymous',
        senderId: socket.id,
        receiverId: to,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        }),
        isPrivate: true,
      };
      socket.to(to).emit('private_message', msg);
      socket.emit('private_message', msg);
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (users[socket.id]) {
        const { username } = users[socket.id];
        io.emit('user_left', { 
        username, 
        id: socket.id,
        timestamp: formatDate(new Date())
      });

      }
      delete users[socket.id];
      delete typingUsers[socket.id];
      io.emit('user_list', Object.values(users));
      io.emit('typing_users', Object.values(typingUsers));
    });
  });

  return { users, messages, typingUsers };
};
