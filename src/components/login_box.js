import React, {useState, useEffect} from 'react';
import '../styles/Login_screen_style.css';
import {useNavigate} from 'react-router-dom';
import TextBox from "./textBox";

const Login_box = () => {
    const [activeSection, setActiveSection] = useState('section1');
    const navigator = useNavigate ();

    // this handles the click on a section and prevents closing all tabs leaving one open constantly
    const handleSectionClick = (section) => {
        set_auth_error("")
        setPassword_error("")
        if (activeSection === section)
            return;
        setActiveSection(section);
    };

    // returns true if the passed section is the active section
    const isSectionActive = (section) => {
        return activeSection === section;
    };


    const [username_error, setUsername_error] = useState('');
    const [password_error, setPassword_error] = useState('');
    const [confirm_password_error, setConfirm_password_error] = useState('');
    const [email_error, setEmail_error] = useState('');


    const [auth_error, set_auth_error] = useState('');
    const [signup_error, set_signup_error] = useState('');


    const [username_login, setUsername] = useState('');
    const [password_login, setPassword] = useState('');



    function handle_username_login_change(value) {
        setUsername(value)
    }
    function handle_password_login_change(value) {
        setPassword(value)
    }

    const log_in = () => {
        // ask the server if the user exists
        // get the user from the database
        authenticate()
    }

    const authenticate = async () => {
        if ( !password_login)
            set_auth_error("password cannot be empty")
        try {
            const payload = {password: password_login, email: username_login};
            const response = await fetch('https://solid-clock-api.onrender.com/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            console.log(response)

            const data = await response.json();
            if (response.status === 201){
                console.log(data); // display the response data
                document.cookie = "user_id=" + data.user_id + "; path=/;";
                document.cookie = "user_name=" + data.username + "; path=/;";
                navigator("/home_screen")
            }
            else{
                set_auth_error(data.error)
                console.log(data.error)
            }

        }catch (error) {
            console.log('Error occurred:', error);
        }
    };


    const [username_sign_up, setUsername_sign_up] = useState('');
    const [password_sign_up, setPassword_sign_up] = useState('');
    const [password_sign_up_confirm, setPassword_sign_up_confirm] = useState('');
    const [email_sign_up, setEmail_sign_up] = useState('');

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

    function handle_sign_up_click() {
        sign_up()
    }

    // add data check...
    const sign_up = async () => {
        console.log("sign-up")
        console.log("username: " + username_sign_up)
        console.log("password: " + password_sign_up)
        console.log("confirm password: " + password_sign_up_confirm)
        console.log("email: " + email_sign_up)
        if( ! (password_sign_up === password_sign_up_confirm))
            return;

        console.log(username_error)
        console.log(password_error)
        console.log(confirm_password_error)
        console.log(email_error)
        if ( username_error || password_error || confirm_password_error || email_error)
            return;

        try {
            const payload = {username: username_sign_up, password: password_sign_up, email: email_sign_up };
            const response = await fetch('https://solid-clock-api.onrender.com/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const data = response.json()
            if (response.ok)
                // open the login tab
                handleSectionClick('section1')
            else{
                set_signup_error(data.error)
                console.log(data.error)
            }
        } catch (error) {
            console.log('Error occurred:', error);
        }
    };

    const [email_forgot, setEmail_forgot] = useState('');
    const [email_sent, setEmail_sent] = useState('');
    const [error_sending, setError_sending] = useState('');

    const handle_forgot_click = async () => {
        if ( email_error )
            return

        try {
            console.log(email_forgot)
            const payload = {email: email_forgot};
            const response = await fetch('https://solid-clock-api.onrender.com/api/user/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setEmail_sent("true")
                setError_sending("")
            } else {
                setEmail_sent("")
                setError_sending("This email does not exist")
            }
        } catch (error) {
            setError_sending("Recovery Email failed, try again later")
        }
    }

    const already_signed_in_this_session = () => {
        var cookies = document.cookie.split(';');
        // TODO: maybe add iterator loop if we will have time
        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].trim().startsWith("user_id="))
                return true
        }
        return false;
    }


    const [new_password, set_new_password] = useState('');
    const [new_password_confirm, set_new_password_confirm] = useState('');
    const [new_password_message, set_new_password_message] = useState('');
    const [new_password_errror, setNew_password_errror] = useState('');
    const [token_error, settoken_error] = useState('');

    const [token, set_token] = useState('');

    function handle_password_change(value) {
        set_new_password(value)
        set_new_password_message("")
    }
    function handle_password_confirm_change(value) {
        set_new_password_confirm(value)
        set_new_password_message("")
    }
    function handle_token_field_change(value) {
        set_token(value)
    }

    const reset_password = async () => {
        if (new_password === "" || new_password_confirm === "")
            return set_new_password_message("passwords cannot be empty")
        if (new_password_errror)
            return

        console.log("token:");
        console.log(token);

        try {
            const payload = {password: new_password};
            const response = await fetch(`https://solid-clock-api.onrender.com/api/user/reset_password/${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.status === 201){
                console.log(data);
                setEmail_sent("")
                setError_sending("")
                handleSectionClick('section1')
            }
            else{
                set_new_password_message(data.error)
            }

        }catch (error) {
            console.log('Error occurred:', error);
        }
    };


    const handle_enter_pressed = (e) => {
        console.log('Key up detected:', e.keyCode);  // Log this
        if (e.keyCode === 13) {
            if (activeSection === 'section1') {
                log_in();
            } else if (activeSection === 'section2') {
                handle_sign_up_click();
            } else if (activeSection === 'section3' && email_sent) {
                reset_password();
            }
        }
    };


    useEffect(() => {
        if (already_signed_in_this_session())
            navigator("/home_screen")
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
                            <a>E-mail</a>
                            <TextBox type="email" placeholder="E-mail" onChange={handle_username_login_change}  onKeyUp={handle_enter_pressed} errorMessage={username_error} setErrorMessage={setUsername_error}/>

                            <a>Password</a>
                            <TextBox type="password_login" placeholder="Password" onChange={handle_password_login_change} onKeyUp={handle_enter_pressed} errorMessage={password_error} setErrorMessage={setPassword_error}/>
                            <button onClick={log_in}>Login</button>
                            <br/>
                            <br/>
                            <br/>
                            <p id="error">{auth_error}</p>
                            {/*<div id="buttons">*/}
                            {/*    <div className="sign_with" id="google_login"/>*/}
                            {/*    <div className="sign_with" id="apple_login"/>*/}
                            {/*</div>*/}
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
                        <a>Your name</a>
                        <TextBox type="username" placeholder="What is your name?" onChange={handle_username_sign_up_Change} onKeyUp={handle_enter_pressed} errorMessage={username_error} setErrorMessage={setUsername_error}/>
                        <a>Password</a>
                        <TextBox type="password" placeholder="choose password" onChange={handle_password_sign_up_Change} onKeyUp={handle_enter_pressed} validate={password_sign_up_confirm} errorMessage={password_error} setErrorMessage={setPassword_error}/>
                        <a>Confirm password</a>
                        <TextBox type="password" placeholder="choose password" onChange={handle_password_sign_up_confirm_Change} onKeyUp={handle_enter_pressed} validate={password_sign_up} errorMessage={password_error} setErrorMessage={setPassword_error}/>
                        <a>E-mail</a>
                        <TextBox type="email" placeholder="E-mail" onChange={handle_email_sign_up_Change} onKeyUp={handle_enter_pressed} errorMessage={email_error} setErrorMessage={setEmail_error}/>
                        <button onClick={handle_sign_up_click}>Sign-up</button>
                        <br/>
                        <br/>
                        <br/>
                        <p id="error">{signup_error}</p>
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
                        { !email_sent && (
                            <div>
                                <a>E-mail</a>
                                <TextBox type="email" placeholder="E-mail" onChange={handle_email_forgot_Change} onKeyUp={handle_enter_pressed} errorMessage={email_error} setErrorMessage={setEmail_error}/>
                                <button onClick={() => handle_forgot_click()}>Reset my password</button>
                                <br/>
                                <br/>
                            </div>
                        )}
                        {error_sending && (
                            <div>
                                <p id="error">{error_sending}</p>
                            </div>
                        )}
                        {email_sent && (
                            <div>
                                <p id="good">A recovery token was sent by email</p>
                                <a>New password</a>
                                <TextBox type="password" placeholder="Choose your new password" onChange={handle_password_change} onKeyUp={handle_enter_pressed} validate={new_password_confirm} errorMessage={new_password_errror} setErrorMessage={setNew_password_errror}/>
                                <a>Confirm new password</a>
                                <TextBox type="password" placeholder="Confirm your new password" onChange={handle_password_confirm_change} onKeyUp={handle_enter_pressed} validate={new_password} errorMessage={new_password_errror} setErrorMessage={setNew_password_errror}/>
                                <br/>
                                <a>Reset token</a>
                                <TextBox type="text" placeholder="Paste your reset Token" onChange={handle_token_field_change} onKeyUp={handle_enter_pressed} errorMessage={token_error} setErrorMessage={settoken_error}/>
                                {new_password_message && <p id="message">{new_password_message}</p>}
                                <button onClick={reset_password}>change password</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Login_box;