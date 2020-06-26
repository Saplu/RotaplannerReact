import React, {useState} from 'react'

const Button = ({ team, activateClick }) => {
    const handleActivateClick = (event) => {
        event.preventDefault()
        activateClick(team)
    }
    return (
        <button onClick={handleActivateClick}>{team}</button>
    )
}

export default Button