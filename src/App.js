import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login_screen from "./screens/Login_screen";
import Home_screen from "./screens/Home";



function App() {
    return(
        // check which screen I need
        <Router>
            <Routes>
                <Route path="/" element={<Login_screen/>}/>
                <Route path="/home_screen" element={<Home_screen/>}/>
            </Routes>
        </Router>
    );
}

export default App;
