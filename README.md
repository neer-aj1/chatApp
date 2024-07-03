# Chat App
## Frontend
Frontend is made using react <br>
To install the dependencies of frontend do: <br>
```bash
cd frontend
npm install
```
Frontend runs on PORT: 3000 <br>
## Backend
Backend server is made using Express wrapped with Socket.io for realtime messages. <br>
To install the dependencies of backend do: <br>
```bash
npm install
```
The env file will contain<br>
1. PORT=5000
2. MONGO_URI=your_mongo_connection_string
3. JWT_SECRET=your_jwt_secret <br>

## API Documentation

The backend API provides endpoints for user authentication and message handling.<br>
Authentication

    POST /api/auth/signup - Register a new user
    POST /api/auth/login - Authenticate a user and get a JWT

Messages

    GET /api/messages/:id - Get messages for a chat
    POST /api/messages/send/:id - Send a new message
