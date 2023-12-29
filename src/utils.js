/**
 * Capitalise the first character of a string.
 *
 */
export const capitalise = string => string[0].toUpperCase() + string.slice(1);

/**
 * Durstenfeld's version of the Fisher — Yates shuffle algorithm.
 * See more: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/**
 * Generate a random number between min (inclusive) and max (inclusive).
 */
export const getRandomNumBetweenMinAndMax = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Scroll to the top of the window.
 */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });