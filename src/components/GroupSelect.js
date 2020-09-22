import React from 'react'
import GroupButton from '../components/GroupButton'
import { changeGroup, changeDc } from '../reducers/groupReducer'
import { useDispatch, useSelector } from 'react-redux'
import '../App.css';

const GroupButtons = () => {
  const dispatch = useDispatch()
  let groups = useSelector(state => state.groups.groups)
  let currentDc = useSelector(state => state.groups.selectedDaycare)

  const handleGroupChange = (event) => {
    const group = event
    dispatch(changeGroup(group))
  }

  const handleDcChange = () => {
    currentDc === 0 ? currentDc = 1 : currentDc = 0
    dispatch(changeDc(currentDc))
  }

  return(
    <div>
      {groups.map(g => 
        <GroupButton key={g}
          team={g}
          activateClick={handleGroupChange}
        />
      )}
      <button onClick={handleDcChange} className="Padded">Change Daycare</button>
    </div>
  )
}

export default GroupButtons