import React, {useRef, useState} from 'react';
import '../styles/App.css';
import '../styles/Login_screen_style.css';
import Login_box from "../components/login_box";
import TextBox from "../components/textBox";



function Login(){

    const [forgot_modal_show, set_forgot_modal_show] = useState(false);
    const forgot_modal_ref = useRef(null);

    const [change_password, set_change_password] = useState('');
    const [change_password_confirm, set_change_password_confirm] = useState('');


    const close_forgot_Modal = () => {
        set_forgot_modal_show(false);
    };

    function handle_password_forgot_Change(value) {
        console.log(value)
        set_change_password(value)
    }

    function handle_confirm_password_forgot_Change(value) {
        console.log(value)
        set_change_password_confirm(value)
    }

    return (
        <div className="background">
            <h1 id="header">
                welcome to Solid-clock
            </h1>
            {forgot_modal_show && (
                <div className="modal">
                    <div className="modal-content" ref={forgot_modal_ref}>
                        <div className="close" onClick={close_forgot_Modal}>&times;</div>
                        <h2>Reset password</h2>
                        <p>new password</p>
                        <TextBox type="password" placeholder="Password" onChange={handle_password_forgot_Change}></TextBox>
                        <br/>
                        <p>confirm new password</p>
                        <TextBox type="password" placeholder="Confirm password" onChange={handle_confirm_password_forgot_Change}></TextBox>
                        <br/>
                        <button onClick={""}>submit</button>
                    </div>
                </div>
            )}
            <Login_box forgot_modal_show={forgot_modal_show} set_forgot_modal_show={set_forgot_modal_show}/>
        </div>
    );
}

export default Login;