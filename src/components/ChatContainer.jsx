import styles from "../styles/chatContainer.module.css";

// Used Children to avoid propdrilling
function ChatContainer({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default ChatContainer;
