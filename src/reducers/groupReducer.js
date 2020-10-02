import daycareService from '../services/DaycareService'

const reducer = (state={selectedGroup: 0, selectedDaycare: 0, groups: [0, 1, 2, 3]}, action) => {
  switch(action.type) {
  case'CHANGE_GROUP':
    state = {...state, selectedGroup: action.data}
    return state
  case'CHANGE_DC':
    state = {...state, selectedDaycare: action.dc, groups: action.groups}
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