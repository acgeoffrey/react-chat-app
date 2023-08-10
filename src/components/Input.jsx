import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "../styles/input.module.css";
import UserAutoComplete from "./UserAutoComplete";

function Input({ handleMessageSent, users }) {
  const inputElement = useRef(null);
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  // For User autocomplete
  const [usersList, setUsersList] = useState([]);
  const [mention, setMention] = useState("");
  const [listenMention, setListenMention] = useState(false);
  const [isBackspace, setIsBackspace] = useState(false);

  // Handle the Message Text in Input
  const handleMessageText = (e) => {
    // console.log("HANDLE MESSAGE TEXT FN");
    const currentCharacter = e.target.value.charAt(e.target.value.length - 1);

    e.preventDefault();
    setMessage(e.target.value);

    if (currentCharacter === "@") {
      // console.log("CURRENT CHAR @");
      setListenMention(true);
    }

    if (listenMention && !isBackspace) {
      // console.log("MENTION SETTING");
      setMention((mention) => mention + currentCharacter);
    }

    if (currentCharacter === " ") {
      // console.log("SPACE DETECTOR");
      setListenMention(false);
      setMention("");
    }
  };

  // Listen to backspace and edit the edit text
  const handleMessageBack = (e) => {
    if (e.key === "Backspace") {
      // console.log("BACKSPACE");
      setIsBackspace(true);
      setMention((mention) => mention.slice(0, -1));
    } else {
      // console.log("OTHERKEYS");
      setIsBackspace(false);
    }
  };

  // Handle selecting of user in mentions
  const handleSelectUser = (user) => {
    // console.log("USER SELECTED");
    // console.log("FullMessage ", message);
    // console.log(mention, mention.length);
    // console.log("message ", message.slice(0, -mention.length));

    if (mention.length) {
      setMessage((message) => message.slice(0, -mention.length) + user);
    } else {
      setMessage((message) => message + user);
    }
    setMention("");
    setListenMention(false);
    inputElement.current.focus();
  };

  // Autocomplete User List in mention
  useEffect(
    function () {
      // console.log("ENTERED USE-EFFECT");
      inputElement.current.focus();
      let filteredUsers = users.filter((user) =>
        user.toLowerCase().includes(mention.toLowerCase())
      );

      setUsersList(filteredUsers);
    },
    [mention, users]
  );

  return (
    <div className={styles.inputContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessageSent(message);
          setMessage("");
          setIsEmojiPickerOpen(false);
        }}
      >
        <div className={styles.inputBox}>
          <div className={styles.emojiPickerIcon}>
            {isEmojiPickerOpen && (
              <div className={styles.emojiPicker}>
                <EmojiPicker
                  onEmojiClick={(item) =>
                    setMessage((message) => message + item.emoji)
                  }
                />
              </div>
            )}
            {usersList.length > 0 && listenMention && (
              <UserAutoComplete
                users={usersList}
                handleSelectUser={handleSelectUser}
              />
            )}
            <i
              className="fa-solid fa-face-smile"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            ></i>
          </div>
          <input
            type="text"
            value={message}
            placeholder="Message"
            onChange={handleMessageText}
            onKeyDown={handleMessageBack}
            ref={inputElement}
          />
          <button type="submit" className={styles.msgBtn}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;
