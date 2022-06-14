import React from 'react';
import ButtonRow from '../ButtonRow';
import ToggleButton from '../ToggleButton';

function ControlPane({
    title,
    options,
    currentOption,
    handleSelectOption
}) {
    console.info('options: ' + JSON.stringify(options))
    return (
        <div>
            <h2>{title}</h2>
            <ButtonRow>
                {options.map(({ id, name }) =>
                    <ToggleButton 
                        key={id}
                        selected={currentOption === id}
                        // Need to pass id to handleSelectOption for categories
                        // But need to pass name to others
                        onClick={() => handleSelectOption(id)}
                    >
                        {name}
                    </ToggleButton>
                )}
            </ButtonRow>
        </div>

    )
}

export default ControlPane;