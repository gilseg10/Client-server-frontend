import React, { useState } from 'react';
import "../styles/Home_screen_style.css"

function Clock({start_time, set_start_time, end_time, set_end_time}) {

    const [center_label, set_center_label] = useState("Start");
    const [timer_started, set_timer_state] = useState(false);

    const [circle_radius, set_circle_radius] = useState(145); // less than the center points because of the stroke
    const [circle_circumference, set_circle_circumference] = useState(circle_radius * 2 * Math.PI);
    const [timer_interval, set_timer_interval] = useState( circle_circumference / (12 * 60 * 60));

    // set the svg property states
    const [circle_fill_color, set_circle_fill_color] = useState("#FF4D4D76");
    const [offset_from_start, set_circle_offset] = useState(0);

    const [timeFill, set_time_fill] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);



    // TODO: add timeout after timer cancel so the user cant start a new one until the old one is clear
    function clear_times(){
        const timeoutID = setTimeout(() => {
            set_start_time("")
            set_end_time("")
        }, 5000);

        // Cleanup function to clear the timeout in case the component is unmounted before the delay
        return () => clearTimeout(timeoutID);
    }
    const timer_toggle = () => {
        if (timer_started){ // TODO: add a popup with "are you sure" to stop the user from spamming the circle and trashing the database.
            stop_timer();
            return
        }
        start_timer();
    }

    const start_timer = () => {
        set_timer_state(true);
        set_center_label("Stop")
        let time = new Date()
        set_start_time("Clock-in " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

        // TODO: remove number later, its for debugging
        // TODO: add logics when the circle fills then stop timer
        const newTimeFill = setInterval(() => { // Move this line to here
            set_circle_offset(offset_from_start => offset_from_start + timer_interval + 5);
            setElapsedTime(elapsedTime => elapsedTime + 1); // add this line
        }, 1000);

        set_time_fill(newTimeFill)
    }

    const stop_timer = () => {
        set_timer_state(false);
        let time = new Date();
        set_end_time("Clock-out " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());
        set_center_label("Start")

        clearInterval(timeFill);
        set_time_fill(null);
        set_circle_offset(0);
        setElapsedTime(0);


        clear_times() // hide the times after timer cancels
    }

    return (
        <div id="container">
            <svg
                className="progress_ring"
                width="300"
                height="300">

                <circle
                    onClick={timer_toggle}
                    className="svg_circle"
                    stroke="white"
                    strokeWidth="5"

                    fill={circle_fill_color}
                    r={circle_radius}
                    cx="150"
                    cy="150"
                    style={{
                        strokeDasharray: `${circle_circumference} ${circle_circumference}`,
                        strokeDashoffset: `${circle_circumference - offset_from_start }`,
                    }}
                />

                {[...Array(12)].map((_, index) => (
                    <line
                        key={index}
                        x1="150"
                        y1="20"
                        x2="150"
                        y2="30"
                        stroke="black"
                        strokeWidth="2"
                        transform={`rotate(${index * 30}, 150, 150)`}
                    />
                ))}
            </svg>
            <a id="circle_label">{center_label}</a>
            <p id="elapsed_time">{Math.floor(elapsedTime / 3600)}:
                {(Math.floor(elapsedTime / 60) % 60 < 10 ? '0' : '') + Math.floor(elapsedTime / 60) % 60}:
                {(elapsedTime % 60 < 10 ? '0' : '') + elapsedTime % 60}
            </p>
        </div>
    );
}

export default Clock;