import '../styles/App.css';
import '../styles/Login_screen_style.css';
import Login_box from "../components/login_box";

function Login(){
    return (
        <div className="background">
            <h1 id="header_login">
                welcome to Solid-clock
            </h1>
            <Login_box/>
        </div>
    );
}

export default Login;