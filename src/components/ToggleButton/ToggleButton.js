import React from 'react';
import styled from 'styled-components';

function ToggleButton({
    isSelected,
    disabled,
    ...delegated
}) {
    return (
        <Button
            isSelected={isSelected}
            aria-pressed={isSelected}
            disabled={disabled}
            {...delegated}
        >

        </Button>
    )
}

const Button = styled.button`
    font-family: var(--font-family-secondary);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--colour-text);
    background-color: ${p => p.isSelected ?
        `var(--colour-button-highlight)`: `var(--colour-background)`};
    border: ${p => p.isSelected ? 'none' : '0.79px solid var(--colour-button)'};
    border-radius: 10px;
    padding: 0.5625em 1.125em;
    cursor: pointer;

    :disabled {
        border-color: var(--colour-button-disabled);
        color: var(--colour-button-disabled);
    }
`

export default ToggleButton;