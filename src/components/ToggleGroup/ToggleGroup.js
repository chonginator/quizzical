import React from 'react';

import PaneWrapper from '../PaneWrapper';
import PaneTitle from '../PaneTitle';
import ButtonRow from '../ButtonRow';

function ToggleGroup({
    title,
    children
}) {
    return (
        <PaneWrapper>
            <PaneTitle>{title}</PaneTitle>
            <ButtonRow>
                {children}
            </ButtonRow>
        </PaneWrapper>
    )
}

export default ToggleGroup;