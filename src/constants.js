// URL used to retrieve categories from the Trivia API
export const categoryUrl = 'https://opentdb.com/api_category.php';

// Base URL used to retrieve trivia questions
export const baseUrl = 'https://opentdb.com/api.php?';

// Number of questions
export const amounts = [10, 20, 30, 40, 50];

// Difficulty levels
export const difficulties = ['easy', 'medium', 'hard'];

// Question types
export const types = ['multiple', 'boolean'];

// Font families
export const FAMILIES = {
    primary: '"Karla", sans-serif',
    secondary: '"Inter", sans-serif',
};

// Colours
export const COLOURS = {
    background: 'hsl(220, 43%, 97%)',
    text: 'hsl(231, 42%, 28%)',
    border: 'hsl(231, 42%, 90%)',
    button: 'hsl(230, 34%, 46%)',
    buttonHighlight: 'hsl(230, 61%, 90%)',
    buttonDisabled: 'hsl(233, 17%, 63%)',
    correct: 'hsl(133, 46%, 71%)',
    incorrect: 'hsl(360, 81%, 85%)',
};

// Font weights
export const WEIGHTS = {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
}

// Media query breakpoints
export const BREAKPOINTS = {
    tabletMin: 550,
}

// Media queries
export const QUERIES = {
    tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin}px)`,
}