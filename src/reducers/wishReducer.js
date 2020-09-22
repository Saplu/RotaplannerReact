import wishes from '../services/wishes'
import WishService from '../services/wishes'

const reducer = (state={emp: 0, shift: 1, day: 1, wishes: []}, action) => {
    switch(action.type) {
        case "ADD_WISH":
            console.log(action.data)
            const newWishes = wishes.push(action.data)
            console.log(newWishes)
            state = {...state, wishes: wishes.push(action.data)}
            console.log(state)
            return state
        default: return state 
    }
}

export const addWish = (newWish) => {
    console.log(newWish)
    console.log('dispatching')
    return async dispatch => {
        await WishService.postWish(newWish)
        dispatch({
            type: "ADD_WISH",
            data: newWish
        })
    }
}

export default reducer