import React, {useState} from 'react';
import '../styles/App.css';
import '../styles/Home_screen_style.css'
import Clock from "../components/clock";

function Home_screen(){
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');

    return(
        <div className="background">
            <h1 id="header">
                Welcome back $$name$$
            </h1>


            <div className="main_box" id="home_main_box">
                <button className="util" id="log_out" ></button>
                <button className="util" id="settings"></button>

                <div className="time_labels_div">
                    { start_time && <a id="start_time" className="time_labels" >{start_time}  </a> }
                    { end_time   && <a id="end_time"   className="time_labels" >{end_time}    </a> }
                </div>

                <Clock start_time={start_time} set_start_time={set_start_time} end_time={end_time} set_end_time={set_end_time}/>
            </div>
        </div>
    );

}

export default Home_screen;