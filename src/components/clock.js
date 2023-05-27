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

        const newTimeFill = setInterval(() => { // Move this line to here
            set_circle_offset(offset_from_start => offset_from_start + timer_interval + 5);  // TODO: remove number later, its for debugging
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
    }

    return (
        <div id="container">
            <svg
                className="progress_ring"
                width="300" // adapt size dynamically after i make the center box
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

        </div>
    );
}

export default Clock;