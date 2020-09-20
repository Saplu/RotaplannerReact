import daycareService from '../services/DaycareService'

const reducer = (state=[0, 0, [0, 1, 2, 3]], action) => {
  switch(action.type) {
  case'CHANGE_GROUP':
    state[0] = action.data
    console.log(state)
    return state
  case'CHANGE_DC':
    state[1] = action.dc
    state[2] = action.groups
    console.log(state)
    return state
  default: return state
  }
}

export const changeGroup = (newGroup) => {
  return {
    type: 'CHANGE_GROUP',
    data: newGroup
  }
}

export const changeDc = (newDc) => {
  return async dispatch => {
    const newCount = await daycareService.getGroups(newDc)
    dispatch({
      type: 'CHANGE_DC',
      groups: newCount,
      dc: newDc
    })
  }
}

export default reducer