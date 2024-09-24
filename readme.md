# 🔥 Real-time Chat Application with JWT Authentication and Room Management

This is a **real-time chat application** built using **Socket.io** and **Express**, complete with **JWT authentication** to secure user sessions. Users can join specific chat rooms, send messages, and engage in real-time conversations. The app uses **token-based authentication** stored in **HTTP-only cookies** to ensure secure socket connections and seamless message exchanges. 💬✨

## 🛠️ Key Features
- **Real-time Messaging**: Communicate instantly across chat rooms using **Socket.io**, with smooth broadcast capabilities.
- **JWT Authentication**: Secure login system using **JSON Web Tokens (JWT)** to authenticate users and keep their sessions secure.
- **Room Management**: Users can join specific chat rooms and send messages to members within that room.
- **Token-based Authorization**: Validates users via **JWT tokens** stored in cookies, ensuring only authorized users can join rooms and exchange messages.
- **Secure Cookie Handling**: Uses **HTTP-only, secure cookies** for storing tokens, preventing XSS attacks.
- **Error Handling**: Robust error handling for token validation and room joining.
- **Responsive Design**: Simple and elegant UI for an optimal chat experience on any device.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js, Socket.io
- **Frontend**: React.js with Material UI & Tailwind CSS
- **Authentication**: JSON Web Tokens (JWT)
- **WebSockets**: Real-time communication via Socket.io
- **Security**: Secure cookies with `httpOnly` and `SameSite` attributes
- **Styling**: Material UI & Tailwind CSS for clean, responsive design

## 💻 How it Works
1. **Login**: Users log in to the app, and a **JWT** is generated and sent to the client as a **secure HTTP-only cookie**.
2. **Join Room**: After logging in, users can join chat rooms by providing a room name.
3. **Send Messages**: Users can send real-time messages to other members of the room. Messages are broadcasted to all users in the room.
4. **Secure Communication**: The JWT token is verified for every user trying to send or receive messages to ensure secure communication.

## 🚀 Getting Started
### Prerequisites:
- Node.js and npm installed
- MongoDB (if you plan to extend it with database integration)

### Installation:
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

