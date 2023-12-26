export const TRIVIA_CATEGORIES_URL = 'https://opentdb.com/api_category.php';

export const TRIVIA_API_URL = 'https://opentdb.com/api.php?';

export const NUMBER_OF_QUESTIONS_OPTIONS = [10, 20, 30, 40, 50];

export const QUESTION_DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'];

export const QUESTION_TYPE_OPTIONS = ['multiple', 'boolean'];

// Font FONT_FAMILIES
export const FONT_FAMILIES = {
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
    lemon: 'hsl(54, 100%, 91%)'
};

// Font FONT_WEIGHTS
export const FONT_WEIGHTS = {
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