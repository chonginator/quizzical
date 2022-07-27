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