import React, { useState } from 'react';

function InputField(props) {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function validateInput(type, value) {
        let regex;
        switch (type) {
            case 'username':
                // Allow alphanumeric characters only
                regex = /^[a-z0-9]+$/i;
                return regex.test(value) ? '' : 'Only alphanumeric characters are allowed in username.';
            case 'password':
                // Enforce minimum length
                if (value.length < 6) {
                    return 'Password Must be at least 6 characters long.';
                }
                return '';
            case 'email':
                // Basic email pattern check
                regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                return regex.test(value) ? '' : 'Email address.';
            case 'phone':
                // Simple check for phone numbers. This might vary depending on the country.
                regex = /^[0-9]{10}$/;
                return regex.test(value) ? '' : 'Phone number. Must be 10 digits.';
            default:
                return '';
        }
    }

    function handleChange(event) {
        setValue(event.target.value);
        const error = validateInput(props.type, event.target.value);
        setErrorMessage(error);
    }

    return (
        <div>
            <input type={props.type === 'password' ? 'password' : 'text'} value={value} onChange={handleChange} />
            {errorMessage && <div>{errorMessage}</div>}
        </div>
    );
}

export default InputField;