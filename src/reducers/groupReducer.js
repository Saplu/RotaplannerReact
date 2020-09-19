const reducer = (state=0, action) => {
  switch(action.type) {
  case'CHANGE_GROUP':
    return action.data
  default: return state
  }
}

export const changeGroup = (newGroup) => {
  return {
    type: 'CHANGE_GROUP',
    data: newGroup
  }
}

export default reducer