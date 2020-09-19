import React from 'react'
import GroupButton from '../components/GroupButton'
import { changeGroup } from '../reducers/groupReducer'
import { useDispatch } from 'react-redux'

const GroupButtons = ({count}) => {
  const dispatch = useDispatch()
  let groups = []
  let i = 0
  for (i = 0; i < count; i++){
    groups[i] = i
  }

  const handleGroupChange = (event) => {
    const group = event
    dispatch(changeGroup(group))
  }

  return(
    <div>
      {groups.map(g => 
        <GroupButton key={g}
          team={g}
          activateClick={handleGroupChange}
        />
      )}
    </div>
  )
}

export default GroupButtons