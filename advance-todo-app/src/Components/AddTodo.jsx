import React, { useEffect, useState } from "react";

const AddTodo = ({page, allTodos, getTodos, perPage }) => {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");


  const apiUrl = "http://localhost:3001/Todos";

  useEffect(() => {
    getTodos(apiUrl, page);
  }, [page, perPage]);

  const handleInpChange = (e) => {
    setTodo(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim(" ") == "" || date.trim(" ") == "") alert("Add Both Values First...");
    else {
        if(checkTitle(todo)){
            alert('This Todo already exists in the list..!')
        }else{

            const todoObject = {
                title: todo,
                startDate: getDateBro(),
                endDate: date,
                status: false,
            };
            postTodo(todoObject);
            setTodo("");
            setDate('')
        }
    }
  };

  function getDateBro() {
    const currentDate = new Date();
    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
    const formattedDate = currentDate.toLocaleString("en-US", options);

    return formattedDate;
  }

  function checkTitle(todo){
    const filteredTodo = allTodos.filter((el,ind)=> el.title == todo)
    if(filteredTodo.length > 0) return true
    else return false
  }

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  async function postTodo(todo) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });

      const result = await response.json();
      //   console.log("Success:", result);
      getTodos(apiUrl,page);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        justifyContent: "space-evenly",
        margin: "auto",
        alignItems: "center",
        textAlign: "center",
        padding:"30px",
        margin:"30px",
        border:"2px solid orange",
        borderRadius:"50%"
      }}
    >
      <div>
        <label>Enter Todo </label><br/>
        <input
          type="text"
          placeholder="Write Todo Here..."
          onChange={handleInpChange}
          value={todo}
          width={"200px"}
          style={{margin:"10px", padding:"10px", fontSize:"20px"}}
        /><br/>
        <input
          type="date"
          placeholder="Select a date..."
          onChange={handleDateChange}
          min = {getCurrentDate()}
          value={date}
          width={"200px"}
          style={{margin:"10px", padding:"10px", fontSize:"20px"}}
        />
      </div>
      <div>
        <button onClick={handleAddTodo}>Add</button>
      </div>
    </div>
  );
};

export default AddTodo;
