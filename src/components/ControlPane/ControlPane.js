import React from 'react';
import styled from 'styled-components';

import ToggleButton from '../ToggleButton';

function ControlPane({
    title,
    options,
    currentOption,
    disabled,
    handleSelectOption
}) {
    // console.info('options: ' + JSON.stringify(options))
    return (
        <Wrapper>
            <Title>{title}</Title>
            <ButtonRow>
                {options.map(({ id, label }) => {
                    return (
                        <ToggleButton 
                            key={id}
                            isSelected={currentOption === id}
                            // Need to pass id to handleSelectOption for categories
                            // But need to pass name to others
                            disabled={disabled}
                            onClick={() => handleSelectOption(id)}
                        >
                            {label}
                        </ToggleButton>
                    )
                })}
            </ButtonRow>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    border-bottom: 1px solid var(--colour-border);
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    padding-top: 1.2em;
    padding-bottom: 1.4em;
`

const Title = styled.p`
    font-size: 1.2rem;
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-bold);
`

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.9em;
`

export default ControlPane;