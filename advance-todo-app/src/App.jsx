import { useEffect, useState } from "react";
import "./App.css";
import AllTodos from "../src/Database/todo.json";
import AddTodo from "./Components/AddTodo";
import MapTodos from "./Components/MapTodos";
import Pagination from "./Components/Pagination";

function App() {

  const [allTodos, setAllTodos] = useState(AllTodos.Todos.reverse());
  const [totalPages,setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);

  function getTodos(url,page){
    fetch(`${url}/?_page=${page}&_per_page=${perPage}`)
    .then((res)=>res.json())
    .then((res)=>{
      setAllTodos(res.data)
      setTotalPages(res.pages)
    }).catch((err)=>console.error(err))
  }


  return (
    <div>
      <h1>Task Collector</h1>
      <div>
        <AddTodo page = {page} perPage={perPage} allTodos={allTodos} getTodos={getTodos} setAllTodos={setAllTodos}/>
        <div>
          <h2>Set Todo Limits</h2>
          <input width={"200px"}
          style={{margin:"10px", padding:"10px", fontSize:"20px"}} type="number" placeholder="Set Per Page limit..." onChange={(e)=>setPerPage(e.target.value)} />
        </div>
        <MapTodos  getTodos={getTodos} allTodos={allTodos}/>
        <Pagination page ={page} perPage={perPage} setPage={setPage} totalPages={totalPages}/>
      </div>
    </div>
  );
}

export default App;
