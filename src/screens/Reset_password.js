import React, {useState} from 'react';
import '../styles/App.css';
import '../styles/reset_password.css';

import TextBox from "../components/textBox";

function Reset_homescreen(){

    const [password, set_password] = useState('');
    const [password_confirm, set_password_confirm] = useState('');
    const [message, set_message] = useState('');


    const [password_error, setPassword_error] = useState('');

    function handle_password_change(value) {
        set_password(value)
        set_message("")
    }
    function handle_password_confirm_change(value) {
        set_password_confirm(value)
        set_message("")
    }





    const reset_password = async () => {
        if (password === "" || password_confirm === "")
            return set_message("passwords cannot be empty")
        if (password_error)
            return

        const currentUrl = "http://localhost:4000/api/user/reset_password/8b4afc40db08a6928c48ce8b7337fbcc36ab29c11aeb5dfa008ef7aa68e0af2d";
        const token = currentUrl.split("/reset_password/")[1];
        console.log(token);
        try {
            const payload = {password: password};
            const response = await fetch(`/api/user/reset_password/${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.status === 201){
                console.log(data);
                navigator("/")
            }
            else if (response.status === 400){
                set_message(data.error)
            }
            else {
                console.log('Authentication failed');
            }
        }catch (error) {
            console.log('Error occurred:', error);
        }
    };



    return(
        <div className="background">
            <h1 id="header_home">
                Solid clock password reset
            </h1>
            <div className="reset_container">
                <div className="main_box" id="home_main_box">
                    <h2>Password reset</h2>
                    <a>password</a>
                    <TextBox type="password" placeholder="Choose your new password" onChange={handle_password_change} validate={password_confirm} errorMessage={password_error} setErrorMessage={setPassword_error}/>
                    <br/>
                    <a>Confirm password</a>
                    <TextBox type="password" placeholder="Confirm your new password" onChange={handle_password_confirm_change} validate={password} errorMessage={password_error} setErrorMessage={setPassword_error}/>
                    <br/>
                    {message && <p id="message">{message}</p>}
                    <button onClick={reset_password}>change password</button>
                </div>
            </div>
            <div className="bottom-bar">
                <p id="bottom-text">this site uses cookies to store your super secret data, you dont really have a choice so there is no option to turn it off...</p>
            </div>
        </div>
    );
}
export default Reset_homescreen;