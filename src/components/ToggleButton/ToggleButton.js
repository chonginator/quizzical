import React from 'react';

import ToggleButtonWrapper from '../ToggleButtonWrapper';

function ToggleButton({
    children,
    isSelected,
    disabled,
    ...delegated
}) {
    return (
        <ToggleButtonWrapper
            isSelected={isSelected}
            aria-pressed={isSelected}
            disabled={disabled}
            {...delegated}
        >
            {children}
        </ToggleButtonWrapper>
    )
}

export default ToggleButton;