import React from 'react';
import '../styles/App.css';
import Login_box from "../components/login_box";

function Login(){
    return (
        <div className="background">
            <h1 id="header">
                welcome to Solid-Clock
            </h1>
            <Login_box />
        </div>
    );
}

export default Login;