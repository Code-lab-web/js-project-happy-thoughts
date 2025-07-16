import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card.tsx";
import "./index.css";
import "./components/Card.css";
import "./components/Card.tsx";
import "./components/Card.js";
import "./components/form.js";
import "./components/index.json";
import "./components/main.tsx";
import "./components/App.css";
import "./components/App.js";
import "./components/App.js";
import "./components/index.css";
import "./components/index.js";
import "./components/tests.ts";
import "./components/index.html";
import "./components/tests.tsx";
import "./form.css";
import { Form } from "./form.jsx";
import "./App.css";
import "./index.css";
import main from "./main.js";
import Main from "./main.tsx";

fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts");
fetch(
  "https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/THOUGHT_ID/like"
);
const [thoughts, setThoughts] = useState<{ message: string }[]>([]);
const handleFormSubmit = (event) => {
  event.preventDefault();
  fetch("<https://technigo-thoughts.herokuapp.com/>", {
    method: "POST",
    body: JSON.stringify({
      message: "Hello world",
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((newThought) => {
      setThoughts((previousThoughts) => [newThought, ...previousThoughts]);
    });
};

// if creating a Review as an object
interface Review {
  id: number;
  text: string;
  dessert: string;
}

const App = () => {
  const [selectedCard, setSelectedCard] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]); // if implementing an array of reviews
  const [review, setReview] = useState(""); // if implementing one review only, as string.
  const [reviewText, setReviewText] = useState("");

  const handleCardSelect = (title: string) => {
    setSelectedCard(title);
  };

  // setting a signle review as a text, then clearing the text area
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // stop from doing its default re render here.
    setReview(reviewText);
    setReviewText("");
  };

  return (
    <main className="app">
      <div className="card-container">
        <Card
          title="Message App"
          description="A simple message app"
          icon="/images/message.svg"
          color="all"
          isSelected={selectedCard === "Message App"}
          onSelect={() => handleCardSelect("Message App")}
        />
      </div>

      <div className="message-section">
        <h2>Write a message</h2>
        <form onSubmit={handleReviewSubmit} className="message-form">
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder={`Write a thought for ${
              selectedCard || "your thought"
            }...`}
            className="review-input"
            disabled={!selectedCard} // not able to write anything if not selected a message.
          />
          <button
            type="submit"
            className="send"
            disabled={!selectedCard || !reviewText.trim()} // button is disabled if no text or not selected a card
          >
            Send
          </button>
        </form>

        <div className="send-container">
          <h3>Recent message</h3>
          <p className="message-text">{review}</p>

          {/* IF creating an array of message with richer info, this is how to loop through and display them
<h3>Recent Message</h3>
{message.map(message => (
<div key={message.id} className="message-card">
<span className="Message-App">{message.app}</span>
<p className="message-text">{message.text}</p>
 </div>
          ))} */}
        </div>
      </div>
    </main>
  );
};

export default App;
