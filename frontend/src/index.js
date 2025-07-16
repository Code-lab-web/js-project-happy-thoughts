import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const App = () => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(() => {
    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts")
      .then((res) => res.json())
      .then((json) => setThoughts(json))
      .catch((error) => console.error("Error fetching thoughts:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://technigo-thoughts.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify({
        message: "Hello world",
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts]);
      })
      .catch((error) => console.error("Error posting thought:", error));
  };

  return (
    <div>
      <h1>Happy Thoughts</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Write a happy thought" name="message" />
        <button type="submit">Send</button>
      </form>
      <ul>
        {thoughts.map((thought) => (
          <li key={thought._id}>{thought.message}</li>
        ))}
      </ul>
    </div>
  );
};
// const animationButton = () => {
//   // Add your animation logic here or remove this function if not needed
// };
// Removed unused decrement state
// Removed unused count state
  // Removed duplicate handleSubmit function
  // Removed duplicate handleSubmit function
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
// Removed invalid console.log statement
