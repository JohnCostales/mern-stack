import React from 'react'
import Spinner from './spinner.gif'

export default () => {
    return (
        <div>
            <img className="loading-spinner" src={Spinner} alt="Loding..." ></img>
        </div>
    )
}
