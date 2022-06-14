import React from 'react';

function ToggleButton({
    id,
    ...delegated
}) {
    return (
        <button
            {...delegated}
        >

        </button>
    )
}

export default ToggleButton;