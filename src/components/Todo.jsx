import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./todo.module.css";
function Todo() {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/todo").then((result) => {
      const todoData = result.data;
      const todos = [];

      for (const key in todoData) {
        todos.push({ id: key, title: todoData[key].title });
      }

      setTodoList(todos);
    });
  }, []);

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = (event) => {
    event.preventDefault();
    setTodoList((pre) => [
      ...pre,
      { id: todoList.length + 1, title: todoName },
    ]);
    console.log(todoList);

    axios
      .post("http://localhost:8000/api/todo", {
        title: todoName,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

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
          <li className={styles["list-item"]} key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todo;
