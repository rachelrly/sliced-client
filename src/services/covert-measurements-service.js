export function convertMeasurements(ing, num) {

    //num is number to scale down by
    //from slider
    //multiply times slider location, rounds to one of four points
    // 0.66, 0.5, 0.33, 0.25

    const { metric_unit, amount_in_metric } = ing
    const amount = amount_in_metric * num;

    if (metric_unit === null) {
        return amount;
    }

    //if metric_unit === 'grams'

    if (metric_unit === 'mL') {
        mlToAmountStr(amount)
    }

    //the below functions should return strings are 
    //set as "amount" in ingredient component
    //string that combines input back into 
    //return new_amount_str

}

//how do I get this to continue 
//WHILE LOOP n % x !== 0
//put n through mlToAmountStr

//add response to new string
//i++

//check for % in condition of while loop or 
//send in return as property of object
//or push to string outside the scope and return remainder


mlToAmountStr = num => {
    if (num > 250) {
        //convert to cups
        //return object {amt: '1 cup', remainder: 33}
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



