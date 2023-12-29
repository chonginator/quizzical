import styled from 'styled-components';

const Button = styled.button`
    font-family: var(--font-family-secondary);
    font-weight: var(--font-weight-semiBold);
    background-color: var(--colour-button);
    color: var(--colour-background);
    border: none;
    border-radius: 0.9375em;
    padding: 0.5625em 1.125em;
    cursor: pointer;

    :disabled {
        background-color: var(--colour-button-disabled);
    }
`

export default Button;