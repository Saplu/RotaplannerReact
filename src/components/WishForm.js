import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWish, deleteWish } from '../reducers/wishReducer'
import Wish from '../components/wish'
import { modifyError } from '../reducers/errorReducer'

const NewWish = () => {
    const dispatch = useDispatch()
    const creator = useSelector(state => state.id.name)
    const set = useSelector(state => state.id.set)
    const wishes = useSelector(state => state.wishes.wishes)
    const groups = useSelector(state => state.groups.groups)
    const error = useSelector(state => state.error)

    const add = (event) => {
        event.preventDefault()
        console.log(groups)
        if (isNaN(event.target.emp.value)){
            dispatch(modifyError('Cannot convert employee to a number'))
        }
        else if (Number(event.target.emp.value) > groups.length * 3 - 1 || Number(event.target.emp.value) < 0) {
            dispatch(modifyError('Cannot find employee with selected id'))
        }
        else if (isNaN(event.target.shift.value)){
            dispatch(modifyError('Cannot convert shift to a number'))
        }
        else if (Number(event.target.shift.value) > groups.length * 3 || Number(event.target.shift.value) < 1) {
            dispatch(modifyError('Shift out of bounds'))
        }
        else if (isNaN(event.target.day.value)){
            dispatch(modifyError('Cannot convert day to a number'))
        }
        else if (Number(event.target.day.value) > 15 || Number(event.target.day.value) < 1) {
            dispatch(modifyError('Day out of bounds'))
        }
        else if (creator.length === 0){
            dispatch(modifyError('Identify yourself'))
        }
        else if (set.length === 0){
            dispatch(modifyError('Give set name'))
        }
        else {
            dispatch(modifyError(''))
            const wish = {
                EmpId: Number(event.target.emp.value),
                Shift: event.target.shift.value - 1,
                Day: event.target.day.value - 1,
                Creator: creator,
                Set: set
            }
            dispatch(addWish(wish))
        }
    }

    const handleWishDelete = wish => {
        dispatch(deleteWish(wish))
    }

    return (
        <div>
            <p>{error}</p>
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