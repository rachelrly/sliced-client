/*Scales and formats units and amounts for recipe page, returning object with keys unit and num  */


export function useScale(num, unit, multiply) {

    let newAmount = num * multiply
    let newUnit = unit

    if (unit === 'cup' && newAmount < 0.25 && newAmount !== 0) {
        newAmount = newAmount * 16;
        newUnit = 'tbsp'
    }

    if (unit === 'tbsp' && newAmount < 0.5 && newAmount !== 0) {
        newAmount = 1.5;
        newUnit = 'tsp'
    }

    if (unit === 'tsp' && Number(newAmount.toString()[0]) >= 3) {
        newAmount = newAmount / 3;
        newUnit = 'tbsp'
    }

    let formatNum = ''

    const getMixedNumber = (num, frac) => {
        const arr = num.toString().split('')
        return arr[0] == 0 ? `${frac}` : `${arr[0]} ${frac}`;
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
                            : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 37
                                ? formatNum = getMixedNumber(newAmount, '3/8')
                                : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 62
                                    ? formatNum = getMixedNumber(newAmount, '5/8')
                                    : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 12
                                        ? formatNum = getMixedNumber(newAmount, '1/8')
                                        : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 87
                                            ? formatNum = getMixedNumber(newAmount, '7/8')
                                            : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 33
                                                ? formatNum = getMixedNumber(newAmount, '1/3')
                                                : Number(`${newAmount.toString()[2]}${newAmount.toString()[3]}`) === 66
                                                    ? formatNum = getMixedNumber(newAmount, '2/3')
                                                    : formatNum = newAmount.toString().length > 5 ? Number(newAmount.toString().slice(0, 5)) : newAmount;


    return { num: formatNum, unit: newUnit };

}