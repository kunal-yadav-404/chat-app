# Chat Application

This is a simple real-time chat application built with HTML, CSS, and JavaScript using Socket.io. It supports sending text messages and images between users, with a basic user interface to differentiate between messages from different users.

##Snapshots
![image](https://github.com/user-attachments/assets/dc8d7354-f89a-48e4-999c-3e0fb05c49fd)

![image](https://github.com/user-attachments/assets/049062e5-5deb-4518-b565-259353d5765c)



## Features

- **User Identification**: Users enter their names before joining the chat.
- **Real-time Messaging**: Messages are sent and received in real-time using Socket.io.
- **Image Support**: Users can send and receive images.
- **Message Differentiation**: Messages are styled to distinguish between sender and receiver messages.

## Installation

To run the chat application locally, follow these steps:

### Prerequisites

- Node.js and npm installed on your machine.

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/chat-application.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd chat-application
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:3000` to use the chat application.

## File Structure

- **public/**
  - **index.html**: Main HTML file with the chat UI.
  - **styles.css**: CSS file for styling the chat application.
  - **scripts.js**: JavaScript file for handling chat functionality and Socket.io integration.
- **server.js**: Node.js server file to set up the Socket.io server.
- **package.json**: Node.js project file with dependencies and scripts.

## Usage

1. **Enter Your Name**: When you first open the application, you will be prompted to enter your name.
2. **Join the Chat**: Click the "Join Chat" button to enter the chat room.
3. **Send Messages**: Type your message in the input box and press "Send" or use the paperclip icon to attach an image.
4. **View Messages**: Messages from you and other users will appear in the chat window, with different styles for sender and receiver messages.

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. If you have any suggestions or find bugs, please open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Socket.io**: For real-time communication functionality.
- **Font Awesome**: For icons used in the application.
