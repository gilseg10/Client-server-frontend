import React from 'react';
import ExpandingBox from './components/center_box';
import './styles/login_box_style.css';
import './styles/App.css';
import TextBox from "./components/textBox";



function App() {

    const [current_screen, set_current_screen] = React.useState('login_screen');

    const switch_screen = () => {
        set_current_screen('clock_screen');
    };

    const render_screen = () => {
        switch (current_screen){
            case 'login_screen':
                console.log("login screen showing")
                return (
                    <div>
                        <h1 id="header">
                            welcome to PunchClock
                        </h1>
                        <ExpandingBox onSwitchScreen={switch_screen} />
                    </div>
                );

            case 'clock_screen':
                console.log("clock_screen showing")
                return <TextBox/>

            default:
            console.log("default option invoked")
        }


    };

    return <div className="App">{render_screen()}</div>
}

export default App;
