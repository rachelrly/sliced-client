export function scale(num, unit, multiply) {

    const amount = num * multiply

    let string = `${amount} ${unit}`


    return string;

}