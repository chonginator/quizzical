import { createGlobalStyle } from 'styled-components';
import {
    FONT_FAMILIES,
    COLOURS,
    FONT_WEIGHTS,
    QUERIES
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
    input, button, textarea, select, a {
        font: inherit;
        
        /* Remove blue highlight around clickable elements */
        -webkit-tap-highlight-color: transparent;
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
        --font-family-primary: ${FONT_FAMILIES.primary};
        --font-family-secondary: ${FONT_FAMILIES.secondary};

        --font-weight-regular: ${FONT_WEIGHTS.regular};
        --font-weight-medium: ${FONT_WEIGHTS.medium};
        --font-weight-semiBold: ${FONT_WEIGHTS.semiBold};
        --font-weight-bold: ${FONT_WEIGHTS.bold};

        --colour-background: ${COLOURS.background};
        --colour-text: ${COLOURS.text};
        --colour-border: ${COLOURS.border};
        --colour-button: ${COLOURS.button};
        --colour-button-highlight: ${COLOURS.buttonHighlight};
        --colour-button-disabled: ${COLOURS.buttonDisabled};
        --colour-correct: ${COLOURS.correct};
        --colour-incorrect: ${COLOURS.incorrect};

    }

    /* My global styles */
    html {
        font-size: 0.75rem;
        
        @media ${QUERIES.tabletAndUp} {
            font-size: 0.8rem;
        }
    }

    body {
        background-color: var(--colour-background);
        color: var(--colour-text);
    }
`

export default GlobalStyles;