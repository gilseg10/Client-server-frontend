import React, { useState, useRef } from 'react';

function InputField({errorMessage, setErrorMessage, validate, type, onChange, placeholder}) {
    const [value, setValue] = useState('');
    // const [errorMessage, setErrorMessage] = useState('');

    function validateInput(type, value) {
        let regex;
        let regex2;

        // clear the error message if the text box is empty
        if (!value) return '';

        switch (type) {
            // check for a valid username without spaces and without special characters
            case 'username':
                regex = /^[a-z0-9]+$/i;
                regex2 = /\s/;
                if ( regex2.test(value))
                    return 'No spaces allowed'
                if (! regex.test(value))
                    return 'no special characters allowed'
                break;

            // also make it match the confirm password
            case 'password':
                if (value.length < 6) {
                    return 'Password needs 6+ characters';
                }
                if ( ! (value === validate))
                    return 'Mismatched passwords'
                break;

            case 'password_login':
                if (value.length < 6) {
                    return 'Password needs 6+ characters';
                }
                break;

            // check for a valid email address using regex for a basic email structure
            case 'email':
                regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                return regex.test(value) ? '' : 'Invalid Email address format';

            case 'text':
                return '';


            // check for a valid phone number without characters and of length 10
            // removed, but left for possible future addition.
            case 'phone':
                regex = /^[0-9]{10}$/;
                regex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).+$/;
                if (regex.test(value))
                    return 'Phone number Must be 10 digits';
                if (! regex2.test(value))
                    return 'No letters or symbols allowed';
                break;
            default:
                return '';
        }
    }

    function handleChange(event) {
        const updatedValue = event.target.value;
        setValue(updatedValue);
        const error = validateInput(type, event.target.value);
        setErrorMessage(error);

        if (typeof onChange === 'function') {
            onChange(updatedValue);
        }
    }

    return (
        // maybe add an animation for the appearance and disappearance of the errorMessage message div below
        <div id="input_container">
            <input
                type={type === 'password' || type === 'password_login' ? 'password' : 'text'}
                value={value}
                placeholder={placeholder}
                onChange={handleChange} />
            { errorMessage && <div id="errorMessage" >{errorMessage}</div> }
        </div>
    );
}

export default InputField;