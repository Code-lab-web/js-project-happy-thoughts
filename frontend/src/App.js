import React, { useEffect } from "react";
import { useEffect } from "react";
import {useState} from "react";
import {express} from "express";
import "./index.css";


import express from "express";

const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
import './routes/index';
// Removed unused variable indexRouter
// Removed unused variable authRouter

function Header() {
    useEffect(() => {
    console.log('mount')
}, [])
    return (
        <div className="App">
            <header className="App-header">
            <h1>Message App Happy Thoughts</h1>
</header>
        </div>

    )
}
// character limit exceeded when char >140
export default function App () {
    const [text, setText] = useState("");
    const[error, setError] = useState("");
    const handleChange = (e) => {
        console.log(e.target.value);
        if(e.target.value.length > 140) {
                setError("character limit exceeded");
            } else {
                setText(e.target.value);
            setError(null);
        }
    };

    return (
        <div className="App">
            <div className="input-container">
                <input
                    className="input"
                    type="text"
                    placeholder=" enter something ..."
                    onChange={handleChange}
                    value={text}
                />
                <span className="error">{error && error}</span>
            </div>
        </div>
    );
}
export { Header };