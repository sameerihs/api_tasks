import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";
import { backend_url } from "./url";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  // Set the website title to your roll number
  useEffect(() => {
    document.title = "21BAI1109";
  }, []);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    setError("");
    setResponse(null);
    setSelectedOptions([]);

    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await axios.post(`${backend_url}/bfhl`, {
        data: parsedInput.data,
      });
      // console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      setError("Invalid JSON input or Error fetching data");
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected ? selected.map((opt) => opt.value) : []);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    return (
      <div className="filtered-response">
        {selectedOptions.includes("numbers") && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("alphabets") && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("highest_alphabet") && (
          <div>
            <h3>Highest Alphabet:</h3>
            <p>{response.highest_alphabet}</p>
          </div>
        )}
      </div>
    );
  };

  const options = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div className="App">
      <h1>{"21BAI1109"}</h1>
      <input
        type="text"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON input"
        className="json-input"
      />
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={handleOptionChange}
            className="multi-select"
            placeholder="Select filters..."
          />
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
