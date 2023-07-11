import React, {useEffect, useState} from 'react';
import "../styles/Home_screen_style.css"
import Dropdown from "./dropown";

function Table({ tableVisible, setTableVisible, showTableOnMobile, setShowTableOnMobile, find_cookie, workSessions}) {

    const handleTableExit = () => {
        setTableVisible(false);
        // setShowTableOnMobile(false);
    };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();



    const days = [];

    const totalTimes = days.map((day) => day.total_time);

    for (let day = 1; day <= daysInMonth; day++) {
        const formattedDate = `${day < 10 ? '0' + day : day}.${currentMonth < 10 ? '0' + currentMonth : currentMonth}.${currentYear}`;

        const dataForDate = {
            date: formattedDate,
            total_time: '00:00:00',
        };

        // Push the data object to the days array
        days.push(dataForDate);
    }

    return (
        tableVisible && (
            <div className="attendance_table">
                <button id="table_exit_button" onClick={handleTableExit}></button>

                <div id="header_div">
                    <table id="table">
                        <thead>
                        <tr>
                            <th className="date">Date</th>
                            <th className="times">Total Time</th>
                            <th >Actions</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div id="table_div">
                    <table id="table">
                        <tbody>
                        {days.map((item, index) => (
                            <tr key={index}>
                                <td className="date" >{item.date}</td>
                                <td className="times"> <Dropdown options={totalTimes}/> </td>
                                <td className="table_buttons" >
                                    <button id="comment_table" ></button>
                                    <button id="absence_table" ></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    );
}

export default Table;

