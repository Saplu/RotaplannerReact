import React from 'react'
import { useDispatch } from 'react-redux'
import { addWish } from '../reducers/wishReducer'

const NewWish = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
        const wish = {
            EmpId: Number(event.target.emp.value),
            Shift: event.target.shift.value - 1,
            Day: event.target.day.value - 1,
            Creator: 'Saplu',
            Set: 'default'
        }
        console.log(wish)
        dispatch(addWish(wish))
    }

    return (
        <form onSubmit={add}>
            <div>
                <button type="submit">Add Wish</button>
            </div>
            <div>
                Employee: <input name="emp" defaultValue="0"/>
            </div>
            <div>
                Wanted Shift: <input name="shift" defaultValue="1"/>
            </div>
            <div>
                Day: <input name="day" defaultValue="1"/>
            </div>
        </form>
    )
}

export default NewWish