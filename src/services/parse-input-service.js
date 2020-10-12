//THIS FILE MUST DEAL WITH THE EDGE CASE OF THE 
//AUTO-SHRINK FRACTIONS NOT WORKING WITH REGEX

export function parseInput(str) {
    let splitStr = str.split(' ')
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

    const isNumber = (arr, num) => (arr[num].match(/(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/g))

    const isValidType = str => validTypes.find(type => type === str.toLowerCase());


    if (isNumber(splitStr, 0)) {
        if (isNumber(splitStr, 1)) {
            if (isValidType(splitStr[2])) {
                let amount_str = splitStr.splice(0, 3).join(' ');
                let title = splitStr.join(' ');
                return {
                    amount_str,
                    title,

                }
            } else {
                let amount_str = splitStr.splice(0, 2).join(' ');
                let title = splitStr.join(' ');
                return {
                    amount_str,
                    title,

                }
            }
        } else if (isValidType(splitStr[1])) {
            let amount_str = splitStr.splice(0, 2).join(' ');
            let title = splitStr.join(' ');
            return {
                amount_str,
                title,

            }

        } else {
            let amount_str = splitStr.splice(0, 1).join(' ');
            let title = splitStr.join(' ');
            return {
                amount_str,
                title,

            }
        }
    } else {
        let amount_str = null
        let title = splitStr.join(' ');
        return {
            amount_str,
            title,

        }
    }

}

