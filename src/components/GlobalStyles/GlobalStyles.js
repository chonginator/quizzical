import { createGlobalStyle } from 'styled-components';
import {
    FAMILIES,
    COLOURS,
    WEIGHTS
} from '../../constants';

const GlobalStyles = createGlobalStyle`
    /*
        Josh's Custom CSS Reset
        https://www.joshwcomeau.com/css/custom-css-reset/
    */
    *, *::before, *::after {
        box-sizing: border-box;
    }

    /*
        2. Remove default margin
    */
    * {
        margin: 0;
    }

    /*
        3. Allow percentage-based heights in the application
    */
    html, body {
        height: 100%;
    }

    /*
        Typographic tweaks!
        4. Add accessible line-height
        5. Improve text rendering
    */
    body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
    }

    /*
        6. Improve media defaults
    */
    img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
    }

    /*
        7. Remove built-in form typography styles
    */
    input, button, textarea, select {
        font: inherit;
    }

    /*
        8. Avoid text overflows
    */
    p, h1, h2, h3, h4, h5, h6 {
        overflow-wrap: break-word;
    }

    /*
        9. Create a root stacking context
    */
    #root, #__next {
        isolation: isolate;
    }

    /* 
        Design tokens
    */
    html {
        --font-family-primary: ${FAMILIES.primary};
        --font-family-secondary: ${FAMILIES.secondary};

        --font-weight-regular: ${WEIGHTS.regular};
        --font-weight-medium: ${WEIGHTS.medium};
        --font-weight-semiBold: ${WEIGHTS.semiBold};
        --font-weight-bold: ${WEIGHTS.bold};

        --colour-background: ${COLOURS.background};
        --colour-text: ${COLOURS.text};
        --colour-button: ${COLOURS.button};
        --colour-button-highlight: ${COLOURS.buttonHighlight};
        --colour-button-disabled: ${COLOURS.buttonDisabled};
        --colour-correct: ${COLOURS.correct};
        --colour-incorrect: ${COLOURS.incorrect};

    }

    /* My global styles */
    body {
        background-color: var(--colour-background);
        color: var(--colour-text);
    }

`

export default GlobalStyles;