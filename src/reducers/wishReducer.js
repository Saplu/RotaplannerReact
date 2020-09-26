import WishService from '../services/wishes'

const reducer = (state={emp: 0, shift: 1, day: 1, wishes: []}, action) => {
    switch(action.type) {
        case "ADD_WISH":
            state = {...state, wishes: state.wishes.concat(action.data)}
            console.log(state)
            return state
        case "DELETE_WISH":
            const wishToDelete = state.wishes.find(w => w.set === action.data.Set &&
                w.Day === action.data.Day &&
                w.Creator === action.data.Creator &&
                w.Shift === action.data.Shift &&
                w.EmpId === action.data.EmpId)
            console.log(wishToDelete)
            return state
        default: return state 
    }
}

export const addWish = (newWish) => {
    console.log(newWish)
    return async dispatch => {
        await WishService.postWish(newWish)
        dispatch({
            type: "ADD_WISH",
            data: newWish
        })
    }
}

export const deleteWish = (wish) => {
    console.log(wish)
    return async dispatch => {
        await WishService.deleteWish(wish)
        dispatch({
            type: "DELETE_WISH",
            data: wish
        })
    }
}

export default reducer