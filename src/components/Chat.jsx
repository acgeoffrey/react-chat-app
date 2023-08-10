import styles from "../styles/chatContainer.module.css";

function Chat({ chat, handleLikeCount }) {
  const { id, user, message, likes, image, time } = chat;

  return (
    <div className={styles.chatDiv}>
      <div className={styles.userImg}>
        {image ? (
          <img src={image} alt="profile-pic" className={styles.image} />
        ) : (
          <p className={styles.image}>{user.substring(0, 1)}</p>
        )}
      </div>
      <div className={styles.messageData}>
        <div className={styles.messageLikesDiv}>
          <p className={styles.message}>{message}</p>
          <p className={styles.likes} onClick={() => handleLikeCount(id)}>
            {likes > 0 && likes} 👍🏻
          </p>
        </div>
        <div className={styles.userTimeDiv}>
          <p className={styles.user}>{user}</p>
          <p className={styles.time}>{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
