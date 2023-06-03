import React from 'react';
import "../styles/Home_screen_style.css"

function Table() {

    // Sample data for table
    const data = [
        {date: '2023-06-03', total_util: 10},
        {date: '2023-06-04', total_util: 20},
        {date: '2023-06-05', total_util: 30},
        // ... more data ...
    ];

    return (
        <div>
            <button id="table_exit_button"></button>
            <table id="table">
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.total_util}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;