
# Chat Application

Welcome to the **Chat Application** repository! This project is a fully functional real-time chat application developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack and powered by Socket.io for live messaging. With this application, users can create channels, share files, upload profile pictures, and enjoy a smooth, responsive chat experience across desktop and mobile devices.

## Features

- **Real-Time Messaging**: Instant message sending and receiving with Socket.io for seamless communication.
- **Channel Creation**: Users can create, join, and manage multiple chat channels.
- **File Sharing**: Users can send files and images within chat rooms.
- **Emoji Support**: Integrated emoji picker for a more expressive chat experience.
- **Profile Picture Upload**: Each user can upload and update their profile picture.
- **Custom Message Bar**: Tailored message input bar with enhanced user interactions.
- **Responsive Design**: Optimized for mobile and desktop use, ensuring a user-friendly interface across devices.

## Project Structure

- **client**: Contains the frontend code built with React.js.
- **server**: Contains the backend code with Node.js and Express, handling API requests, user management, and Socket.io configuration.
- **config**: Houses environment and database configurations.
- **uploads**: Stores user-uploaded profile pictures and shared files.

## Environment Variables

### Client Side (`client/.env`)
```plaintext
VITE_SERVER_URL=<YOUR SERVER URL>
```

### Server Side (`server/.env`)
```plaintext
PORT= <YOUR PORT>
JWT_KEY=<JWT SECRET>
ORIGIN=<YOUR FRONT-END URL>
DATABASE_URL=<YOUR MONGO DB URL>
```

## API Endpoints

The API is structured with different routes for authentication, contacts, messages, and channels, making it easy to manage and extend as needed.

### Authentication Routes (`api/auth`)

- `POST /signup` - Register a new user.
- `POST /login` - Log in an existing user.
- `GET /user-info` - Fetch logged-in user information.
- `PUT /update-profile` - Update user profile details.
- `POST /add-profile-image` - Add a profile image.
- `DELETE /delete-profile-image` - Delete a profile image.
- `POST /logout` - Log out the user.

### Contact Routes (`api/contacts`)

- `GET /search` - Search for contacts.
- `GET /get-contacts-for-dm` - Retrieve contacts for direct messaging.
- `GET /get-all-contacts` - Fetch all contacts.

### Message Routes (`api/messages`)

- `GET /get-messages` - Retrieve messages for a specific chat or channel.
- `POST /upload-file` - Upload files within a chat.

### Channel Routes (`api/channel`)

- `POST /create-channel` - Create a new channel.
- `GET /get-user-channels` - Fetch channels that the user belongs to.
- `GET /get-channel-messages` - Retrieve messages for a specific channel.

## Installation

### Prerequisites

- **Node.js** and **npm** installed
- **MongoDB** set up locally or on a cloud service (e.g., MongoDB Atlas)

### Setup Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ksn199ms/Chat-Application.git
   cd Chat-Application
   ```

2. **Install Dependencies**:
   - For the server:
     ```bash
     cd server
     npm install
     ```
   - For the client:
     ```bash
     cd Client
     npm install
     ```

3. **Configure Environment Variables** (see above).

4. **Start the Application**:
   - Run the server:
     ```bash
     npm run dev
     ```
   - Run the client:
     ```bash
     npm run dev
     ```

5. Access the application by navigating to `http://localhost:<client_port>` in your browser.

## Hosted Application

You can access the live version of the Chat Application here: [Chat Application Host URL](https://chat-application-client-tjhl.onrender.com)

## Demo

#### click below to see demo video

[![Demo Video](https://github.com/user-attachments/assets/279b0bdf-db94-44f0-a4e3-8d55c0e18d4c)](https://github.com/user-attachments/assets/b5071459-fa1b-41d0-8a63-98042a80d927)

## Usage

1. **Sign Up / Log In**: Register a new account or log in with an existing one.
2. **Create or Join Channels**: Start or join channels based on user interest or purpose.
3. **Chat and Share Files**: Engage in real-time conversations, and use the file-sharing feature to exchange images and documents.
4. **Update Profile**: Customize your profile by uploading a profile picture and personalizing settings.

## Technologies Used

- **MongoDB** - NoSQL database for storing user and message data.
- **Express.js** - Backend framework for building the REST API.
- **React.js** - Frontend framework for a dynamic and responsive user interface.
- **Node.js** - Server-side runtime environment.
- **Socket.io** - Enables real-time, bidirectional communication for chat functionality.
- **JWT** - For secure user authentication.

## Troubleshooting

- **Socket Connection Issues**: If there are problems with real-time communication, check that the Socket.io server is running and accessible on the correct port.
- **File Upload Errors**: Ensure the `uploads` directory has the correct permissions for storing files.
- **Cross-Origin Requests (CORS)**: Configure CORS settings in Express if facing issues with API requests.

## Contributing

We welcome contributions to enhance this project! To contribute:

1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Make your changes**.
4. **Commit and push** (`git commit -am 'Add new feature'`).
5. **Submit a pull request**.

Feel free to open issues for new features, bug fixes, or improvements.

---
