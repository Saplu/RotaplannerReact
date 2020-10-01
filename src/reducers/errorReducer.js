const reducer = (state='', action) => {
    switch(action.type){
        case "NEW_ERROR":
            state = action.data
            return state
        default: return state
    }
}

export const modifyError = (newError) => {
    return {
        type: "NEW_ERROR",
        data: newError
    }
}

export default reducer