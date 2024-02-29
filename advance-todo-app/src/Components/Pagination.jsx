import React from 'react'

const Pagination = ({page, totalPages, setPage, perPage}) => {
    let arr = new Array(totalPages).fill(1);

    const showButton=(text,ind)=>{
        return <button key={ind+1} disabled={page == text} onClick={()=>setPage(text)}>{text}</button>
    }

  return (
    <div style={{margin:"20px", padding:"10px",border:"2px solid green", borderRadius:"10px", display:"flex", justifyContent:"space-evenly"}}>
        {
           arr.map((el,ind)=>(showButton(ind+1, ind)))
        }
    </div>
  )
}

export default Pagination
