import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

function TaskSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    try {
      setLoading(true);
      if (text.length === 0) {
        alert("Fill all data first..");
        return;
      }
      const response = await axios.post("http://localhost:5000/summarize", {
        text,
      });

      setSummary(response.data.summary);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = () => {
    setText("");
    setSummary("");
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <button onClick={handleBack}>Home</button>
      <h1>Text Summarization Tool</h1>
      <p>Add long text to summarize it into 150 words or less...</p>
      <textarea
        className="text-area"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
        rows={20}
        cols={50}
      />
      <br />
      <button className="btn" onClick={handleSummarize}>
        {loading ? "Summarizing ..." : "Summarize"}
      </button>
      <button className="btn" onClick={handleClear}>
        Clear
      </button>
      <br />
      <h2>Summary:</h2>
      <p>{summary.length > 0 ? summary : "Your Summary will be shown here."}</p>
    </div>
  );
}

export default TaskSummarizer;
