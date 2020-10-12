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


    if (cup.find(c => c === unit) && newAmount < 0.2) {
        newAmount = newAmount * 4;
        newUnit = 'tbsp'
    }

    if (tbsp.find(t => t === unit) && newAmount < 0.5) {
        newAmount = newAmount * 3;
        newUnit = 'tsp'
    }

    let formatNum = ''



    newAmount === 0.5
        ? formatNum = '1/2' : newAmount === 0.25
            ? formatNum = '1/4' : newAmount === 0.75
                ? formatNum = '3/4' :
                formatNum = newAmount


    let string = `${formatNum} ${newUnit}`


    return string;

}