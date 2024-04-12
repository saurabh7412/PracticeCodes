import React, { useState } from "react";
import axios from "axios";
import "../LanguageTranslator.css";
import { useNavigate } from "react-router-dom";

function LanguageTranslator() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClear = ()=>{
    setText("")
    setTranslatedText("")
    setTargetLanguage("")
  }

  const handleBack = () => {
    navigate("/");
  };

  const handleTranslate = async () => {
    try {
        if(text.length == 0 || targetLanguage == ""){
            alert("Fill all data first..")
            return
        }
        setLoading(true);
      const response = await axios.post("http://localhost:5000/translate", {
        text,
        targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="translator">
      <button onClick={handleBack}>Home</button>
      <h1>Language Translator Tool</h1>
      <p>Translate the text into different language.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        rows={20}
        cols={50}
      />
      <br />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="">Select Language</option>
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
        <option value="German">German</option>
        {/* Add more language options as needed */}
      </select>
      <br />
      <button onClick={handleTranslate}>{loading ? "Translating" : "Translate"}</button>
      <button onClick={handleClear}>Clear</button>
      <br />
      <h2>Translated Text:</h2>
      <p>{translatedText.length > 0 ? translatedText : "Translated text will be shown here."}</p>
    </div>
  );
}

export default LanguageTranslator;
