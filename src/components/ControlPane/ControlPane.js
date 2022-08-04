import React from 'react';

import PaneWrapper from '../PaneWrapper';
import PaneTitle from '../PaneTitle';
import ButtonRow from '../ButtonRow';
import ToggleButton from '../ToggleButton';

function ControlPane({
    title,
    options,
    currentOption,
    disabled,
    handleSelectOption
}) {
    return (
        <PaneWrapper>
            <PaneTitle>{title}</PaneTitle>
            <ButtonRow>
                {options.map(({ id: optionId, label }) => {
                    return (
                        <ToggleButton 
                            key={optionId}
                            isSelected={currentOption === optionId}
                            disabled={disabled}
                            onClick={() => handleSelectOption(optionId)}
                        >
                            {label}
                        </ToggleButton>
                    )
                })}
            </ButtonRow>
        </PaneWrapper>
    )
}

export default ControlPane;