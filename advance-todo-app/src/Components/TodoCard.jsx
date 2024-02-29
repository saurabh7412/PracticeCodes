import React from "react";

const TodoCard = ({ getTodos, ele }) => {
  const apiUrl = "http://localhost:3001/Todos";
  const handleToggle = () => {
    editToggle(ele.id);
  };

  async function editToggle(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...ele, status: !ele.status }),
      });

      const result = await response.json();
      // console.log("Success:", result);
      getTodos(apiUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const deleteTodo =async () =>{
    try {
        const response = await fetch(`${apiUrl}/${ele.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        getTodos(apiUrl);
      } catch (error) {
        console.error("Error:", error);
      }

  }




  return (
    <div
      style={{
        border: "2px solid red",
        padding: "5px",
        margin: "15px",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2>Title</h2>
        <span>{ele.title}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2>Start Date</h2>
        <span>{ele.startDate}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2>End Date</h2>
        <span>{ele.endDate}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "80%",
          margin: "auto",
        }}
      >
        <h2>Status</h2>
        <span style={{color: ele.status? "green": "red"}}>{ele.status ? "Completed": "Pending"}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <button onClick={handleToggle}>Toggle Status</button>
        <button style={{backgroundColor:"red"}} onClick={deleteTodo}>Delete Todo</button>
      </div>
    </div>
  );
};

export default TodoCard;
