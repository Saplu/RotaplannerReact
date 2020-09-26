const reducer = (state={name: "Saplu", set: "default"}, action) => {
    switch(action.type) {
        case "CHANGE_NAME":
            state = {...state, name: action.data}
            console.log(state)
            return state
        case "CHANGE_SET":
            state = {...state, set: action.data}
            console.log(state)
            return state
        default: return state
    }
}

export const changeName = (newValue) => {
    return {
        type: "CHANGE_NAME",
        data: newValue
    }
}

export const changeSet = (newValue) => {
    return {
        type: "CHANGE_SET",
        data: newValue
    }
}

export default reducer