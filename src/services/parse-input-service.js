/* This function takes in each string of user input and splits 
it into the propor data format, separating numbers from words and splitting off
words that are validTypes as amount_str and splitting off the rest as title*/

export function parseInput(str) {
    if (!str.length) {
        return true;
    }
    const validTypes = [
        'tsp',
        'teaspoon',
        'tsp.',
        'teaspoons',
        'tbsp',
        'tbsp.',
        'tablespoons',
        'tablespoon',
        'c',
        'c.',
        'cup',
        'cups',
        'pound',
        'pounds',
        'lbs.',
        'oz.',
        'oz',
        'can',
    ]

    let amount_str = '';
    let title = '';

    const isValidType = str => validTypes.find(type => type === str.toLowerCase());

    const splitToType = (str, num) => {
        let arr = str.split(' ');
        amount_str = arr.splice(0, num).join(' ');
        title = arr.join(' ');

        return { amount_str, title };
    }

    if (str.match(/^\d+\s[a-z\s]+|^\d.\d+\s[a-z\s]+/i)) {
        const checkType = str.split(' ')[1];
        return isValidType(checkType) ? splitToType(str, 2) : splitToType(str, 1);
    } else if (str.match(/^\d.\d+\s[a-z\s]+/i)) {
        const checkType = str.split(' ')[1];
        return isValidType(checkType) ? splitToType(str, 2) : splitToType(str, 0);
    } else if (str.match(/^\d\s\d.\d+\s[a-z\s]+/i)) {
        const checkType = str.split(' ')[3];
        return isValidType(checkType) ? splitToType(str, 4) : splitToType(str, 3);
    } else {
        return splitToType(str, 0);
    }



}

