import React, { useState } from 'react';
import "../styles/Home_screen_style.css"

function Clock(props) {

    // set the time control states
    const [start_time, set_start_time] = useState('');
    const [end_time, set_end_time] = useState('');
    const [timer_started, set_timer_state] = useState(false);
    const [timer_interval, set_timer_interval] = useState(1000);

    // set the svg property states
    const [circle_radius, set_circle_radius] = useState(145); // less than the center points because of the stroke
    const [circle_fill_color, set_circle_fill_color] = useState("#FF4D4D76");
    const [circle_circumference, set_circle_circumference] = useState(circle_radius * 2 * Math.PI);

    const timer = () => {
        set_start_time("start: 00:00:00")
        set_end_time("end: 23:59:59")
        console.log("click!")
    }


    return (
        <div id="circle_container">
            { start_time && <div className="time_labels" >{start_time}</div> }
            { end_time && <div className="time_labels" >{end_time}</div> }
            <svg
                className="progress-ring"
                width="300" // adapt size dynamically after i make the center box
                height="300">

                <circle
                    onClick={timer}
                    className="progress-ring__circle" // change this class name later
                    stroke="white"
                    stroke-width="5"
                    fill={circle_fill_color}
                    r={circle_radius}
                    cx="150"
                    cy="150"
                    style={{
                        strokeDasharray: `${circle_circumference} ${circle_circumference}`,
                        strokeDashoffset: `${circle_circumference}`,
                    }}
                />
            </svg>
        </div>
    );
}

export default Clock;



// adapt all of this.............

// function timer(){
//     if (started){
//         stopTimer()
//         setProgress(0);
//         document.getElementById("starter").value= "";
//         document.getElementById("starter").innerHTML = "start";
//         var timerElement = document.getElementById("timer");
//         timerElement.innerHTML = "00:00:00";
//         return;
//     }
//     document.getElementById("starter").innerHTML = "stop";
//     startTimer();
// }
//
// function startTimer() {
//     started = !started;
//     startTime = new Date();
//     endTime = null;
//     timerInterval = setInterval(updateTimer, 1000);
//     document.getElementById("timer").style.display = "block";
// }
//
// function stopTimer() {
//     if (timerInterval) {
//         endTime = new Date();
//         clearInterval(timerInterval);
//         started = !started;
//         timerInterval = null;
//         updateTimer();
//     }
//     document.getElementById("timer").style.display = "none";
// }
//
// function updateTimer() {
//     var elapsedTime = null;
//     if (endTime) {
//         elapsedTime = (endTime - startTime) / 1000;
//     } else {
//         elapsedTime = (new Date() - startTime) / 1000;
//     }
//     var hours = Math.floor(elapsedTime / 3600);
//     if (hours < 10){
//         hours = "0" + hours;
//     }
//     var minutes = Math.floor((elapsedTime - hours * 3600) / 60);
//     if (minutes < 10){
//         minutes = "0" + minutes;
//     }
//     var seconds = Math.floor(elapsedTime - hours * 3600 - minutes * 60);
//     if (seconds < 10){
//         seconds = "0" + seconds;
//     }
//     var timerElement = document.getElementById("timer");
//     timerElement.innerHTML = hours + ":" + minutes + ":" + seconds + "";
//     setProgress(seconds * 1.666);
// }
//
// function setProgress(percent) {
//     const offset = circumference - percent / 100 * circumference;
//     circle.style.strokeDashoffset = offset;
// }