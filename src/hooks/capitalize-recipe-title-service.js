export function useFormatRecipeTitle(title) {
    /*This hook capitalizes the first letter each word of a string
    with O(n) time complexity */

    let word = '';
    let capTitle = ''

    for (let i = 0; i < title.length; i++) {
        if (!word) {
            word += title[i].toUpperCase();
        }
        else if (title[i] === ' ') {
            word += ' ';
            capTitle += word;
            word = '';
        }
        else {
            word += title[i].toLowerCase();
        }
    }
    capTitle += word;

    return capTitle;
}