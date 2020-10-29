import React from 'react';

export default function Navbar() {

    const username = "John Doe";

    window.sessionStorage.setItem("user", username);

    return (
        <div>
            <h5 style={{ "textAlign" : "right", "padding": "20px" }}>Welcome {username}!</h5>
        </div>
    )
}