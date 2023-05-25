import React from 'react';
import '../styles/App.css';

function Home_screen(){

    // adapt all of this.............




    // var startTime = null;
    // var endTime = null;
    // var timerInterval = null;
    // var started = false;
    //
    //
    //
    // var circle = document.querySelector('circle');
    // var radius = circle.r.baseVal.value;
    // var circumference = radius * 2 * Math.PI;
    //
    // circle.style.strokeDasharray = `${circumference} ${circumference}`;
    // circle.style.strokeDashoffset = `${circumference}`;
    //
    //
    //
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









//////////////////////////////////////////////////////////////////////////////////////////////////////



    const timer = () => {
        console.log("click!")
    }

    return (
        <div className="background">
            <h1 id="header">
                Welcome back $$name$$
            </h1>
            <svg
                className="progress-ring"
                width="300"
                height="300">



                <circle
                    onClick={timer}
                    className="progress-ring__circle"
                    stroke="white"
                    stroke-width="5"
                    fill="#FF4D4D76"
                    r="148"
                    cx="150"
                    cy="150"/>
            </svg>
        </div>
    );
}

export default Home_screen;