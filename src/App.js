import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./screens/Login";
import Home_screen from "./screens/Home";
import Reset_password from "./screens/Reset_password";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home_screen" element={<Home_screen />} />
                <Route path="/reset_password" element={<Reset_password />} />
            </Routes>
        </Router>
    );
}

export default App;








// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from "./screens/Login";
// import Home_screen from "./screens/Home";
// import Reset_password from "./screens/Reset_password";
// import { HashRouter } from 'react-router-dom'
//
// function App() {
//     return(
//         // check which screen I need
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login/>}/>
//                 <Route path="/home_screen" element={<Home_screen/>}/>
//                 <Route path="/reset_password" element={<Reset_password/>}/>
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;