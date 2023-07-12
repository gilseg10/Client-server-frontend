import React, {useRef, useState} from 'react';
import '../styles/App.css';
import '../styles/Login_screen_style.css';
import Login_box from "../components/login_box";

function Login(){
    const [forgot_modal_show, set_forgot_modal_show] = useState(false);
    return (
        <div className="background">
            <h1 id="header_login">
                welcome to Solid-clock
            </h1>
            <Login_box forgot_modal_show={forgot_modal_show} set_forgot_modal_show={set_forgot_modal_show}/>
            <div className="bottom-bar">
                <p id="bottom-text">this site uses cookies to store your super secret data, you dont really have a choice so there is no option to turn it off...</p>
            </div>
        </div>
    );
}

export default Login;