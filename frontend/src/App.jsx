import React, { useEffect, useState } from "react";
import "./index.css";

function Header() {
    useEffect(() => {
        console.log('mount')
    }, [])
    return (
        <header className="App-header">
            <h1>Message App Happy Thoughts</h1>
        </header>
    )
}

export default function App() {
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const handleChange = (e) => {
        if (e.target.value.length > 140) {
            setError("character limit exceeded");
        } else {
            setText(e.target.value);
            setError(null);
        }
    };

    return (
        <div className="App">
            <Header />
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
