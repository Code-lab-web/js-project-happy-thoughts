import './form.css';
import { useState } from "react"

export const Form = () => {
  const [answer, setAnswer] = useState("")

  const [THOUGHTS, setThoughts] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("https://technigo-thoughts.herokuapp.com/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: answer }),
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((prevThoughts) => [newThought, ...prevThoughts]);
        setAnswer("");
      });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Text area
        <input
          type="text"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
      </label>
      <button type="submit">Send</button>
      <ul>
        {THOUGHTS.map((thought, index) => (
          <li key={index}>{thought.message}</li>
        ))}
      </ul>
    </form>
  );
}