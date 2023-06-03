import React, {useState} from 'react';
import '../styles/App.css';
import '../styles/Home_screen_style.css'
import Clock from "../components/clock";
import {useNavigate} from "react-router-dom";
import Table from "../components/table";

function Home_screen(){
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const navigator = useNavigate ();
    const [tableVisible, setTableVisible] = useState(false);


    const log_out = () => {
        navigator("/")
    }

    return(
        <div className="background">
            <h1 id="header">
                Welcome back $$name$$
            </h1>
            <div className="container">
                <div className="main_box" id="home_main_box">
                    <button className="util" id="log_out" onClick={log_out}></button>
                    <button className="util" id="settings" ></button>

                    <div className="time_labels_div">
                        { start_time && <a id="start_time" className="time_labels" >{start_time}  </a> }
                        { end_time   && <a id="end_time"   className="time_labels" >{end_time}    </a> }
                    </div>

                    <Clock start_time={start_time} set_start_time={set_start_time} end_time={end_time} set_end_time={set_end_time}/>



                    <div className="middle_buttons_div">
                        <div className="middle_buttons_inner">
                            <button className="middle_buttons" id="comment"></button>
                            <div>Add comment</div>
                        </div>

                        <div className="middle_buttons_inner">
                            <button className="middle_buttons" id="absence"></button>
                            <div>Absence</div>
                        </div>
                    </div>


                    <div className="bottom_buttons_div">
                        <div className="bottom_buttons_div_inner">
                            <button className="bottom_buttons" id="report"></button>
                            <div>Report</div>
                        </div>

                        <div className="bottom_buttons_div_inner">
                            <button className="bottom_buttons" id="view_table" onClick={() => setTableVisible(!tableVisible)}></button>
                            <div>Attendance table</div>
                        </div>
                    </div>
                </div>

                {tableVisible && (
                    <div className="attendance_table">
                        <Table/>
                    </div>
                )}
            </div>

        </div>
    );

}

export default Home_screen;