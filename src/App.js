import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screens/Login";
import Home_screen from "./screens/Home";


function App() {
    return(
        // check which screen I need
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home_screen" element={<Home_screen/>}/>
            </Routes>
        </Router>
    );
}

export default App;
