import React, { useState, useEffect } from 'react';
import '../styles/Login_screen_style.css';
import { useNavigate  } from 'react-router-dom';
import TextBox from "./textBox";

const Login_box = ({onSwitchScreen}) => {
    const [activeSection, setActiveSection] = useState('section1');
    const navigator = useNavigate ();


    const [username, set_username] = useState("username");
    const [password, set_password] = useState("password");

    // this handles the click on a section and prevents closing all tabs leaving one open constantly
    const handleSectionClick = (section) => {
        if (activeSection === section)
            return;
        setActiveSection(section);
    };

    // returns true if the passed section is the active section
    const isSectionActive = (section) => {
        return activeSection === section;
    };

    const log_in = () => {
        // ask the server if the user exists
        // get the user from the database
        set_session_cookie()
        authenticate()
        navigator("/home_screen")
    }

    const authenticate = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }) // TODO: add username and password reading from the text box object
            });

            if (response.ok){
                const user = await response.json();
            }
            else {
                console.log("login failed!!");
            }
        } catch (error) {
            console.log('Login error:', error);
        }

    }

    const set_session_cookie = () => { document.cookie = 'Clock_sign_in_valid ; path=/'; }
    const already_signed_in_this_session = () => {
        var cookies = document.cookie.split(';');

        // TODO: maybe add iterator loop if we will have time
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].trim().startsWith("Clock_sign_in_valid"))
                return true
        }
        return false;
    }

    useEffect(() => {
        if (already_signed_in_this_session())
            console.log("cookie good")
            // navigator("/home_screen")
    }, []);



    return (
        <div className="main_box" id="login_main">
            <div
                className={`section ${isSectionActive('section1') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section1')}
            >
                <p>Login</p>
                    {isSectionActive('section1') && (
                        <>
                            <a>Username</a>
                            <TextBox type="username" placeholder="Username"/>
                            <a>Password</a>
                            <TextBox type="password" placeholder="Password"/>
                            <button onClick={log_in}>Login</button>
                            <div id="buttons">
                                <div className="sign_with" id="google_login"/>
                                <div className="sign_with" id="apple_login"/>
                            </div>
                        </>
                    )}
            </div>

            <div
                className={`section ${isSectionActive('section2') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section2')}
            >
                <p>sign-up</p>
                {isSectionActive('section2') && (
                    <>
                        <a>Username</a>
                        <TextBox type="username" placeholder="Username"/>
                        <a>Password</a>
                        <TextBox type="password" placeholder="Password"/>
                        <a>Confirm password</a>
                        <TextBox type="password" placeholder="Confirm password"/>
                        <a>E-mail</a>
                        <TextBox type="email" placeholder="E-mail"/>
                        <button onClick={() => handleSectionClick('section1')}>Sign-up</button>
                    </>
                )}
            </div>

            <div
                className={`section ${isSectionActive('section3') ? 'active' : ''}`}
                onClick={() => handleSectionClick('section3')}
            >
                <p>forgot password</p>
                {isSectionActive('section3') && (
                    <>
                        <a>E-mail</a>
                        <TextBox type="phone" placeholder="E-mail"/>
                        <button onClick={() => handleSectionClick('section1')}>Reset my password</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login_box;