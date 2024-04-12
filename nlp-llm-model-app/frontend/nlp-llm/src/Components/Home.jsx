import React from "react";
import { Link } from "react-router-dom";
import '../Home.css'

const Home = () => {
  const linkStyle = {
    color: "white",
    fontFamily: "revert-layer",
    fontSize: "20px",
    textDecoration: "none",
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: "#007bff",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign:"center",
        position:"absolute",
        top:"30%",
        left:"30%"
      }}
    >
        <h2>Open AI Integration using GPT- 3.5 Turbo</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/task_summarizer"} style={linkStyle}>
          Task Summarizer
        </Link>
        <Link to={"/language_tanslator"} style={linkStyle}>
          Language Translator
        </Link>
        <Link to={"/task_manager"} style={linkStyle}>
          Task Manager
        </Link>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Home;
