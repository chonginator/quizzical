import React from 'react';
import styled from 'styled-components';

function ToggleGroup({
    children
}) {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export function ToggleGroupItem({
    children,
    isSelected,
    disabled,
    ...delegated
}) {
    return (
        <StyledToggleGroupItem
            isSelected={isSelected}
            aria-pressed={isSelected}
            disabled={disabled}
            {...delegated}
        >
            {children}
        </StyledToggleGroupItem>
    )
}

export function ToggleGroupLoadingItem({ ...delegated }) {
    return <StyledToggleGroupLoadingItem {...delegated} />;
}

export function ToggleGroupAnswer({
    children: answer,
    isSelected,
    disabled,
    isGameOver,
    correctAnswer,
    ...delegated
}) {

    const Toggle = isGameOver ?
        ((answer === correctAnswer) ? ToggleGroupAnswerCorrect
            : (isSelected ? ToggleGroupAnswerIncorrect : StyledToggleGroupItem))
        : StyledToggleGroupItem 

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
  
export function ToggleGroupTitle({ children }) {
    return <StyledToggleGroupTitle>{children}</StyledToggleGroupTitle>
}

export function ToggleGroupLoadingTitle() {
    return <StyledToggleGroupLoadingTitle />
}

export function ToggleGroupRow({ children }) {
    return <StyledToggleGroupRow>{children}</StyledToggleGroupRow>
}

const Wrapper = styled.div`
    border-bottom: 1px solid var(--colour-border);
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    padding-top: 1.2em;
    padding-bottom: 1.4em;
`

const StyledToggleGroupItem = styled.button`
    font-family: var(--font-family-secondary);
    font-size: 0.9rem;
    font-weight: var(--font-weight-medium);
    color: var(--colour-text);
    background-color: ${p => p.isSelected ?
        `var(--colour-button-highlight)`: `var(--colour-background)`};
    border: ${p => p.isSelected ? '0.79px solid transparent' : '0.79px solid var(--colour-button)'};
    border-radius: 10px;
    padding: 0.5625em 1.125em;
    cursor: pointer;

    :disabled {
        border-color: var(--colour-button-disabled);
        color: var(--colour-button-disabled);
    }
`

const StyledToggleGroupLoadingItem = styled(StyledToggleGroupItem)`
    min-width: 75px;
    min-height: 31px;
    border-color: transparent;
    background-color: var(--colour-button-loading);
    cursor: auto;
`

const ToggleGroupAnswerCorrect = styled(StyledToggleGroupItem)`
    background-color: var(--colour-correct);
    
    :disabled {
        color: var(--colour-text);
    }
`

const ToggleGroupAnswerIncorrect = styled(StyledToggleGroupItem)`
    background-color: var(--colour-incorrect);
`

const StyledToggleGroupTitle = styled.p`
    font-size: 1.2rem;
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-bold);
`

const StyledToggleGroupLoadingTitle = styled.p`
    min-height: 1.8rem;
    background-color: var(--colour-button-highlight);
    border-radius: 10px;
`

const StyledToggleGroupRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.9em;
`

export default ToggleGroup;