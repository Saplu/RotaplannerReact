import React from 'react'
import '../App.css'
import { useDispatch } from 'react-redux'
import { changeName, changeSet } from '../reducers/idReducer'

const Identification = () => {
    const dispatch = useDispatch()

    const handleNameChange = (event) => {
        event.preventDefault()
        dispatch(changeName(event.target.value))
    }

    const handleSetChange = (event) => {
        event.preventDefault()
        dispatch(changeSet(event.target.value))
    }

    return (
        <div>
            <input className="Padded" defaultValue="Saplu" onChange={handleNameChange}/>
            <input className="Padded" defaultValue="default" onChange={handleSetChange}/>
        </div>
    )
}

export default Identification