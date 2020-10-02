import shiftService from '../services/shifts'

const reducer = (state = '', action) => {
    switch(action.type){
        case "GET_SHIFTS":
            state = action.data
            console.log(state)
            return state
        default: return state
    }
}

export const getShifts = ({dc, group, creator, set, up}) => {
    return async dispatch => {
        const shifts = await shiftService.getShifts(dc, group, creator, set, up)
        dispatch({
            type: "GET_SHIFTS",
            data: shifts
        })
    }
}

export default reducer