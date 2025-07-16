import { Header } from "./components/Header";
import { ThoughtForm } from "./components/ThoughtForm";
import { ThoughtList } from "./components/ThoughtList"; // Removed duplicate declaration of App
import { useState } from "react";
import { useEffect } from "react";
import "./components/App.css";
import "./components/Card.css";
import "./components/index.css";

import "./App.css";

// Removed duplicate declaration of App

export const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolled!");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    const intervalId = setInterval(() => {
      fetch("https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts", {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((data) => console.log(data));

      console.log("This runs every second");
    }, 1000);

    return () => {
      clearInterval(intervalId);
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <ThoughtForm />
        <ThoughtList />
        <div>
          <button onClick={() => setCount(count + 1)}>Increase count</button>
          <button onClick={() => setCount(count - 1)}>Decrease count</button>
          <button onClick={() => setCount(0)} disabled={count === 0}>
            Reset
          </button>
          <button onClick={() => setCount(count * 2)}>Multiply</button>

          <p>Count: {count}</p>
          {count > 140 && <p>You hit 140!</p>}
        </div>
      </main>
    </>
  );
};
