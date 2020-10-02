import React from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { changeName, changeSet } from '../reducers/idReducer'
import { getWishes } from '../reducers/wishReducer'
import { getShifts } from '../reducers/shiftReducer'
import { modifyError } from '../reducers/errorReducer'

const Identification = () => {
    const dispatch = useDispatch()
    const set = useSelector(state => state.id.set)
    const name = useSelector(state => state.id.name)
    const group = useSelector(state => state.groups.selectedGroup)
    const dc = useSelector(state => state.groups.selectedDaycare)

    const handleNameChange = (event) => {
        event.preventDefault()
        dispatch(changeName(event.target.value))
    }

    const handleSetChange = (event) => {
        event.preventDefault()
        dispatch(changeSet(event.target.value))
    }

    const getServerShifts = async (event) => {
        event.preventDefault()
        console.log(name)
        if (name.length === 0){
            dispatch(modifyError('Identify yourself'))
        }
        else{
            dispatch(getShifts({dc: dc, group: group, creator: name, set: set, up: 0}))
            dispatch(modifyError(''))
        }
    }

    const getDbWishes = async (event) => {
        event.preventDefault()
        dispatch(getWishes({creator: name, set: set}))
    }

    return (
        <div>
            <button className="Padded" onClick={getServerShifts}>Get Shifts</button>
            <input className="Padded" defaultValue="" onChange={handleNameChange}/>
            <input className="Padded" defaultValue="default" onChange={handleSetChange}/>
            <button className="Padded" onClick={getDbWishes}>Get Wishes</button>
        </div>
    )
}

export default Identification