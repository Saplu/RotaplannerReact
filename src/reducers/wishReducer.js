import WishService from '../services/wishes'

const reducer = (state={emp: 0, shift: 1, day: 1, wishes: []}, action) => {
    switch(action.type) {
        case "ADD_WISH":
            state = {...state, wishes: action.data}
            return state
        case "DELETE_WISH":
            state = {...state, wishes: action.data}
            return state
        case "GET_WISHES":
            state = {...state, wishes: action.data}
            return state
        default: return state 
    }
}

export const addWish = (newWish) => {
    return async dispatch => {
        await WishService.postWish(newWish)
        const wishes = await WishService.getSpecific(newWish.Creator, newWish.Set)
        dispatch({
            type: "ADD_WISH",
            data: wishes
        })
    }
}

export const deleteWish = (wish) => {
    return async dispatch => {
        await WishService.deleteWish(wish.id)
        const wishes = await WishService.getSpecific(wish.creator, wish.set)
        dispatch({
            type: "DELETE_WISH",
            data: wishes
        })
    }
}

export const getWishes = ({creator, set}) => {
    return async dispatch => {
        const wishes = await WishService.getSpecific(creator, set)
        dispatch({
            type: "GET_WISHES",
            data: wishes
        })
    }
}

export default reducer