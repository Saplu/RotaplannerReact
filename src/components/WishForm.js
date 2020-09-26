import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWish, deleteWish } from '../reducers/wishReducer'
import Wish from '../components/wish'

const NewWish = () => {
    const dispatch = useDispatch()
    const creator = useSelector(state => state.id.name)
    const set = useSelector(state => state.id.set)
    const wishes = useSelector(state => state.wishes.wishes)

    const add = (event) => {
        event.preventDefault()
        const wish = {
            EmpId: Number(event.target.emp.value),
            Shift: event.target.shift.value - 1,
            Day: event.target.day.value - 1,
            Creator: creator,
            Set: set
        }
        dispatch(addWish(wish))
    }

    const handleWishDelete = wish => {
        dispatch(deleteWish(wish))
    }

    return (
        <div>
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
        {wishes.map(wish =>
            <Wish key={wish.id}
                wish={wish}
                deleteClick={handleWishDelete}
            />
        )}
        </div>
    )
}

export default NewWish