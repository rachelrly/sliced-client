export function convertMeasurements() {
    //if no metric units, convert as whole number
    //multiply times slider location, four break points
    // 0.75, 0.66, 0.5, 0.33,
    // times amount_in_metric

    //if metric_unit === null
    //multiply amount

    //if metric_unit === 'grams'

    if (metric_unit === 'mL') {
        mlToAmountStr(amount_in_metric)
    }


    //string that combines input back into 
    //return new_amount_str

}

//how do I get this to continue 
//WHILE LOOP n % 1 !== 0
//put n through mlToAmountStr
//add response to new string
//i++

mlToAmountStr = num => {
    if (num > 250) {
        //convert to cups
        //return str 'x cups'
    } else if (num >= 125) {
        //convert to 1/2 cups
    } else if (num >= 84) {
        //convert to 1/3 cups
    } else if (num >= 75) {
        //convert to quarter cups
    } else if (num >= 15) {
        //convert to tablespoons
        //return x tbsp
    } else if (num < 15) {
        //convert to teaspoons
    } else if (num < 1) {
        //return pinch
    }
}



