import React from 'react';
import styled from 'styled-components';

import ButtonRow from '../ButtonRow';
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
        <div>
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
        </div>

    )
}

const Title = styled.p`
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-bold);
`

export default ControlPane;