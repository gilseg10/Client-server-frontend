import React, {useState} from 'react';
import '../styles/App.css';
import '../styles/reset_password.css';

import TextBox from "../components/textBox";

function Reset_homescreen(){

    const [new_password, set_new_password] = useState('');
    const [new_password_confirm, set_new_password_confirm] = useState('');
    const [new_password_message, set_new_password_message] = useState('');


    const [new_password_errror, setNew_password_errror] = useState('');

    function handle_password_change(value) {
        set_new_password(value)
        set_new_password_message("")
    }
    function handle_password_confirm_change(value) {
        set_new_password_confirm(value)
        set_new_password_message("")
    }


    const reset_password = async () => {
        if (new_password === "" || new_password_confirm === "")
            return set_new_password_message("passwords cannot be empty")
        if (new_password_errror)
            return

        const currentUrl = "http://localhost:4000/api/user/reset_password/8b4afc40db08a6928c48ce8b7337fbcc36ab29c11aeb5dfa008ef7aa68e0af2d";
        const token = currentUrl.split("/reset_password/")[1];
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
                navigator("/")
            }
            else{
                set_new_password_message(data.error)
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
                    <TextBox type="password" placeholder="Choose your new password" onChange={handle_password_change} validate={new_password_confirm} errorMessage={new_password_errror} setErrorMessage={setNew_password_errror}/>
                    <br/>
                    <a>Confirm password</a>
                    <TextBox type="password" placeholder="Confirm your new password" onChange={handle_password_confirm_change} validate={new_password} errorMessage={new_password_errror} setErrorMessage={setNew_password_errror}/>
                    <br/>
                    {new_password_message && <p id="message">{new_password_message}</p>}
                    <button onClick={reset_password}>change password</button>
                </div>
            </div>
        </div>
    );
}
export default Reset_homescreen;