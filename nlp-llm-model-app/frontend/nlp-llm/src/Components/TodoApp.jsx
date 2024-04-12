// TodoApp.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, toggleTodo } from "../Redux/todoSlice";
import { useNavigate } from "react-router-dom";

const TodoApp = () => {
  const todos = useSelector((state) => state.todos);
  console.log("todos", todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (text.trim().length == 0) {
      alert("Enter a todo first !");
      return;
    }
    dispatch(
      addTodo({
        id: Math.random().toString(36).substr(2, 9),
        text,
        completed: false,
      })
    );
    setText("");
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo({ id }));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo({ id }));
  };
  const handleBack = () => {
    navigate("/");
  };

  return (<>
    <button onClick={handleBack}>Home</button>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // border: "1px solid orange",
        padding: "10px",
        borderRadius: "20px",
      }}
    >
        <h2>Task Manager</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a todo..."
        style={{
          width: "90%",
          fontSize: "20px",
          padding: "10px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
        <button onClick={handleAddTodo}>Add Todo</button>
      <div
        style={{
          width: "50%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              width: "100%",
              display: "flex",
              margin: "auto",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              border:"2px solid white",
              borderRadius:"10px",
            }}
          >
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button style={{width:"30%"}} onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  </>
  );
};

export default TodoApp;
