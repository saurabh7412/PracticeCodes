import React from 'react'
import TodoCard from './TodoCard'

const MapTodos = ({getTodos, allTodos}) => {
  return (
    <div style={{display:"grid", gridTemplateColumns:"repeat(2,1fr)", width:"80%", margin:"auto"}}>{
        allTodos.map((ele,ind)=>(<TodoCard  getTodos={getTodos} key={ind} ele={ele}/>))
    }</div>
  )
}

export default MapTodos
