import styles from "../styles/input.module.css";

function UserAutoComplete({ users, handleSelectUser }) {
  return (
    <div className={styles.usersList}>
      {users.map((user, index) => (
        <p
          key={index}
          className={styles.usersListUser}
          onClick={() => handleSelectUser(user)}
        >
          {user}
        </p>
      ))}
    </div>
  );
}

export default UserAutoComplete;
