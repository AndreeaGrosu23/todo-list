import React from 'react';

export default function Navbar() {

    const username = "Andreea";

    window.sessionStorage.setItem("user", "Andreea");

    return (
        <div>
            <h5 style={{ "textAlign" : "right", "padding": "20px" }}>Welcome {username}!</h5>
        </div>
    )
}