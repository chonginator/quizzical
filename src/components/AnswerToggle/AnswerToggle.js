import React from 'react';
import styled from 'styled-components';

import ToggleButtonWrapper from '../ToggleButtonWrapper';

const AnswerToggle = ({
    children: answer,
    isSelected,
    disabled,
    isGameOver,
    correctAnswer,
    ...delegated
}) => {

    const Toggle = isGameOver ?
        ((answer === correctAnswer) ? CorrectToggle
            : (isSelected ? IncorrectToggle : ToggleButtonWrapper))
        : ToggleButtonWrapper 

    return (
        <Toggle
            isSelected={isSelected}
            aria-pressed={isSelected}
            disabled={disabled}
            {...delegated}
        >
            {answer}
        </Toggle>
    )
}

const CorrectToggle = styled(ToggleButtonWrapper)`
    background-color: var(--colour-correct);
    
    :disabled {
        color: var(--colour-text);
    }
`

const IncorrectToggle = styled(ToggleButtonWrapper)`
    background-color: var(--colour-incorrect);
`

export default AnswerToggle;