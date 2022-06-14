import React from 'react';

function Button({ ...delegated }) {
    return (
        <button {...delegated}>
            Start Quiz
        </button>
    )
}

export default Button;