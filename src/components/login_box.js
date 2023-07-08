import React, {useState, useEffect, useRef} from 'react';
import '../styles/Login_screen_style.css';
import {json, useNavigate} from 'react-router-dom';
import TextBox from "./textBox";

const Login_box = ({onSwitchScreen, forgot_modal_show, set_forgot_modal_show}) => {
    const [activeSection, setActiveSection] = useState('section1');
    const navigator = useNavigate ();

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



    const [username_login, setUsername] = useState('');
    const [password_login, setPassword] = useState('');

    const authenticate = async () => {
        console.log("slog-in")
        console.log("username: " + username_login)
        console.log("password: " + password_login)
        try {
            const payload = { username_login: username_login, password_login: password_login };
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(payload),
            });


            // TODO: save user key as cookie!!!!!
            if (response.ok) {
                // Authentication successful
                const data = await response.json();
                console.log(data); // Process the response data
            } else {
                // Authentication failed
                console.log('Authentication failed');
                console.log(response.json())
            }
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };


    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }


    const [username_sign_up, setUsername_sign_up] = useState('');
    const [password_sign_up, setPassword_sign_up] = useState('');
    const [password_sign_up_confirm, setPassword_sign_up_confirm] = useState('');
    const [email_sign_up, setEmail_sign_up] = useState('');

    // add data check...
    const sign_up = async () => {
        console.log("sign-up")
        console.log("username: " + username_sign_up)
        console.log("password: " + password_sign_up)
        console.log("confirm password: " + password_sign_up_confirm)
        console.log("email: " + email_sign_up)
        if( ! (password_sign_up === password_sign_up_confirm)){
            console.log("passwords not matching...")
            setShowPopup(true);
            await sleep(3000);
            setShowPopup(false);
            return;
        }

        try {
            // const payload = { whatTodo: "signup", username_login: username_login, password_login: password_login };

            const payload = {username: username_sign_up, password: password_sign_up, passwordConfirm: password_sign_up_confirm, email: email_sign_up };
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                // Authentication successful
                const data = await response.json();
                console.log(data.error)
                console.log(data); // Process the response data
                // close in the end
                handleSectionClick('section1')
            } else {
                // Authentication failed
                console.log('Authentication failed');
            }
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };



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






    const [email_forgot, setEmail_forgot] = useState('');
    const [showPopup, setShowPopup] = useState(false);



    function handle_username_login_change(value) {
        setUsername(value)
    }
    function handle_password_login_change(value) {
        setPassword(value)
    }
    function handle_username_sign_up_Change(value) {
        setUsername_sign_up(value)
    }
    function handle_password_sign_up_Change(value) {
        setPassword_sign_up(value)
    }
    function handle_password_sign_up_confirm_Change(value) {
        setPassword_sign_up_confirm(value)
    }
    function handle_email_sign_up_Change(value) {
        setEmail_sign_up(value)
    }
    function handle_email_forgot_Change(value) {
        setEmail_forgot(value)
    }

    function handle_sign_up_click(value) {
        sign_up()
    }


    // const [forgot_modal_show, set_forgot_modal_show] = useState(false);
    const forgot_modal_ref = useRef(null);



    const open_forgot_Modal = () => {
        set_forgot_modal_show(true);
    };

    const close_forgot_Modal = () => {
        set_forgot_modal_show(false);
    };
    function handle_forgot_click(value) {


        open_forgot_Modal()
        // close in the end
        handleSectionClick('section1')
    }

    const handle_click_outside_forgot_modal = (event) => {
        if (forgot_modal_ref.current && !forgot_modal_ref.current.contains(event.target)) {
            close_forgot_Modal();
        }
    };


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
                            <TextBox type="username" placeholder="Username" onChange={handle_username_login_change} />

                            <a>Password</a>
                            <TextBox type="password" placeholder="Password" onChange={handle_password_login_change} />
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
                        <TextBox type="username" placeholder="Username" onChange={handle_username_sign_up_Change} />
                        <a>Password</a>
                        <TextBox type="password" placeholder="Password" onChange={handle_password_sign_up_Change} validate={password_sign_up_confirm}/>
                        <a>Confirm password</a>
                        <TextBox type="password" placeholder="Confirm password" onChange={handle_password_sign_up_confirm_Change} validate={password_sign_up}/>
                        <a>E-mail</a>
                        <TextBox type="email" placeholder="E-mail" onChange={handle_email_sign_up_Change} />
                        <button onClick={handle_sign_up_click}>Sign-up</button>
                        <br/>
                        <br/>
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
                        <TextBox type="phone" placeholder="E-mail" onChange={handle_email_forgot_Change} />
                        <button onClick={() => handle_forgot_click()}>Reset my password</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login_box;