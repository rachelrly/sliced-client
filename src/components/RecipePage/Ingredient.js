import React, { Component } from 'react'
import { parseAmount } from '../../services/parse-amount-service'

class Ingredient extends Component {

    //const isNumber = (arr, num) => (arr[num].match(/(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/g))
    //change this into a class
    //store amount for each ingredient here

    //check against number regex
    //parseInt = true
    constructor(props) {
        super(props)

        this.state = {
            num: 0,
            unit: 'cups',
            multiplyBy: 1
        }
    }

    componentDidMount() {
        this.setState({
            amount: this.props.multiplyBy
        })
    }

    render() {
        const amount = parseAmount(this.props.amount_str, this.state.multiplyBy)
        return (
            <>
                <span className='ing_amount'>{amount}</span>
                <span className='ing_title'>{this.props.title}</span>
            </>

        )
    }
}

export default Ingredient