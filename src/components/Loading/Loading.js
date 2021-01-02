import React from 'react'
import '../../css/Loading.css'
import { RiKnifeLine } from 'react-icons/ri'

function Loading() {
    return (
        <section className='loading_wrapper'>
            <span className='knife_wrapper'><RiKnifeLine className='knife' /></span>
        </section>
    )
}

export default Loading
