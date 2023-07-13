import React, { useState } from 'react';

function Dropdown({ options, selected, find_cookie, selection }) {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        add_work_from()
    };


    const add_work_from = async ()=> {
        let session_id = find_cookie("session_id=").split("=")[1];

        if ( !session_id)
            return

        if ( !(selection === "user"))
            return

        let is_active_session = find_cookie("start_time=").split("=")[1];

        if ( !is_active_session)
            return


        try {
            const payload = {session_id: session_id, working_from: selectedOption};
            const response = await fetch(`https://solid-clock-api.onrender.com/api/home_screen/${session_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok)
                console.log(data)
            else
                console.log(data.error)
        } catch (error) {
            console.log('Error occurred:', error);
        }
    }

    return (
        <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export default Dropdown;
