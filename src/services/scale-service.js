export function scale(num, unit, multiply) {
    let newAmount = num * multiply
    let newUnit = unit
    const tbsp = [
        'tbsp',
        'tbsp.',
        'tablespoons',
        'tablespoon',
    ]
    const cup = [
        'c',
        'c.',
        'cup',
        'cups',
    ]
    const tsp = [
        'tsp',
        't',
        't.',
        'teaspoon',
        'teaspoons'
    ]


    if (cup.find(c => c === unit) && newAmount < 0.25 && newAmount !== 0) {
        newAmount = newAmount * 16;
        newUnit = 'tbsp'
    }

    if (tbsp.find(t => t === unit) && newAmount < 0.5 && newAmount !== 0) {
        newAmount = 1.5;
        newUnit = 'tsp'
    }

    // if (tbsp.find(t => t === unit) && Number(newAmount.toString()[0]) > 4) {
    //     newAmount = 0.25;
    //     newUnit = 'cup'
    // }

    if (tsp.find(t => t === unit) && Number(newAmount.toString()[0]) >= 3) {
        newAmount = newAmount / 3;
        newUnit = 'tbsp'
    }

    let formatNum = ''

    const getMixedNumber = (num, frac) => {
        const arr = num.toString().split('')
        return arr[0] == 0 ? `${frac}` : `${arr[0]} ${frac}`;


    }
    const getRoundedNumber = (num) => {
        const arr = num.toString().split('.')

        return Number(`${arr[0]}${arr[2].splice(0, 3)}`)

    }

    newAmount === 0.5
        ? formatNum = '1/2'
        : newAmount === 0.25
            ? formatNum = '1/4'
            : newAmount === 0.75
                ? formatNum = '3/4'
                : newAmount.toString().length === 3 && newAmount % 0.5 === 0
                    ? formatNum = getMixedNumber(newAmount, '1/2')
                    : newAmount % 0.25 === 0 && Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 25
                        ? formatNum = getMixedNumber(newAmount, '1/4')
                        : newAmount % 0.25 === 0 && Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 75
                            ? formatNum = getMixedNumber(newAmount, '3/4')
                            : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}${newAmount.toString()[4]}`) === 375
                                ? formatNum = getMixedNumber(newAmount, '3/8')
                                : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}${newAmount.toString()[4]}`) === 625
                                    ? formatNum = getMixedNumber(newAmount, '5/8')
                                    : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}${newAmount.toString()[4]}`) === 125
                                        ? formatNum = getMixedNumber(newAmount, '1/8')
                                        : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}${newAmount.toString()[4]}`) === 875
                                            ? formatNum = getMixedNumber(newAmount, '7/8')
                                            : formatNum = newAmount.toString().length > 5 ? Number(newAmount.toString().slice(0, 5)) : newAmount;

    let string = `${formatNum} ${newUnit}`


    return string;

}