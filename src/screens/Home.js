import React from 'react';
import '../styles/App.css';
import Clock from "../components/clock";

function Home_screen(){

    return(
        <div className="background">
            <h1 id="header">
                Welcome back $$name$$
            </h1>
            <Clock/>
        </div>
    );

}

export default Home_screen;