import { useState } from "react";

import Header from "./Header";
import ChatContainer from "./ChatContainer";
import Input from "./Input";
import Chat from "./Chat";

function App() {
  const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];
  const [chats, setChats] = useState([]);

  // Push new messages to Chats array
  const handleMessageSent = (message) => {
    setChats([
      ...chats,
      {
        id: chats.length + 1,
        user: user_list[Math.floor(Math.random() * user_list.length)],
        message,
        likes: 0,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  // Increase Like Count
  function handleLikeCount(id) {
    const updatedChats = chats.map((chat) => {
      if (chat.id === id) {
        return { ...chat, likes: chat.likes + 1 };
      } else {
        return chat;
      }
    });

    setChats(updatedChats);
  }
  // console.log(chats);

  return (
    <div className="app-container">
      <Header />

      <ChatContainer>
        {chats.length > 0 ? (
          chats.map((item) => (
            <Chat key={item.id} chat={item} handleLikeCount={handleLikeCount} />
          ))
        ) : (
          <p className="no-messages">No Messages to display!</p>
        )}
      </ChatContainer>

      <Input handleMessageSent={handleMessageSent} users={user_list} />
    </div>
  );
}

export default App;
