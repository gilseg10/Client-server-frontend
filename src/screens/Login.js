import React from 'react';
import '../styles/App.css';
import ExpandingBox from "../components/center_box";

function Login(){
    return (
        <div className="background">
            <h1 id="header">
                welcome to Solid-Clock
            </h1>
            <ExpandingBox />
        </div>
    );
}

export default Login;