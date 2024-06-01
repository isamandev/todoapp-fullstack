import React, { useState } from "react";
import styles from "./todo.module.css";
function Todo() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };
  const todoAddHandler = (event) => {
    event.preventDefault();
    setTodoList((pre) => [...pre, todoName]);
    setTodoName("");
  };
  return (
    <>
      <form onSubmit={todoAddHandler}>
        <input
          type="text"
          name="task"
          id="task"
          onChange={inputChangeHandler}
          value={todoName}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          add
        </button>
      </form>
      <ul className={styles.list}>
        {todoList.map((item) => (
          <li className={styles["list-item"]} key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
