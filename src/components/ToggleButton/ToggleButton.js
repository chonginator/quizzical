import React from 'react';

function ToggleButton({
    id,
    disabled,
    ...delegated
}) {
    return (
        <button
            disabled={disabled}
            {...delegated}
        >

        </button>
    )
}

export default ToggleButton;