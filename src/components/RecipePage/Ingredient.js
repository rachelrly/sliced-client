import React, { Component } from 'react'
import { parseAmount } from '../../services/parse-amount-service'
import { scale } from '../../services/scale-service'

class Ingredient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            num: null,
            unit: null,

        }
    }

    componentDidMount() {
        const { num, unit } = parseAmount(this.props.amount_str)

        this.setState({
            num,
            unit
        })
    }



    render() {
        const test = scale(this.state.num, this.state.unit, this.props.multiplyBy)
        const amount = this.props.amount_str
            ? <span className='ing_amount'>{test}</span>
            : null

        return (
            <>
                {amount}
                <span className='ing_title'>{this.props.title}</span>
            </>

        )
    }
}

export default Ingredient