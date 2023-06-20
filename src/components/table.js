import React, {useState} from 'react';
import "../styles/Home_screen_style.css"
import Dropdown from "./dropown";

function Table({ tableVisible, setTableVisible, showTableOnMobile, setShowTableOnMobile}) {

    const handleTableExit = () => {
        setTableVisible(false);
        // setShowTableOnMobile(false);
    };

    const days = [
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        {date: '01.06.2022', total_time: "05:30:35"},
        // TODO: add real data ...
    ];

    const totalTimes = days.map((day) => day.total_time);


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
                                <td className="times" > <Dropdown options={totalTimes}/> </td>
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

