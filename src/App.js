import React, {useState, useEffect} from 'react';
import './App.css';
import shiftService from './services/shifts'
import wishService from './services/wishes'
import daycareService from './services/DaycareService'
import Wish from './components/wish'
import GroupButton from './components/GroupButton'

const App = () => {
  const [shifts, setShifts] = useState('')
  const [group, setGroup] = useState(0)
  const [selectedEmployee, setEmployee] = useState(0)
  const [selectedShift, setShift] = useState(0)
  const [selectedDay, setDay] = useState(0)
  const [wishes, setWishes] = useState([])
  const [selectedDc, setDc] = useState(0)
  const [dcTeams, setDcTeams] = useState([])

  useEffect(() => {
    shiftService
      .getAll()
      .then(newShifts => {
        setShifts(newShifts)
      })
  }, [])

  useEffect(() => {
    wishService
      .getAll()
      .then(newWishes => {
        setWishes(newWishes)
      })
  }, [])

  useEffect(() => {
    daycareService.getGroups(0)
      .then(newGroups => {
        setDcTeams(newGroups)
      })
  }, [])

  const handleEmployeeChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= 11){
      setEmployee(Number(event.target.value))
    }
  }

  const handleShiftChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= 11){
      setShift(Number(event.target.value))
    }
  }

  const handleDayChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= 14){
      setDay(Number(event.target.value))
    }
  }

  const handleDcChange = async (event) => {
    event.preventDefault()
    const dcValue = (selectedDc === 0) ? 1 : 0
    setDc(dcValue)
    const Dc = {
      Dc: dcValue
    }
    setGroup(0)
    await daycareService.changeDc(Dc)
    setShifts(await shiftService.getAll())
    setDcTeams(await daycareService.getGroups(dcValue))
  }

  const postData = (event) => {
    event.preventDefault()
    const groupObject = {
      OpenGroup: group
    }
    shiftService
    .postData(groupObject)
      .then(returnedData => {
        shiftService
          .getAll()
          .then(newShifts => {
            setShifts(newShifts)
          })
      })
  }

  const handleGroupChange = (event) => {
    setGroup(event)
  }

  const addWish = async (event) => {
    event.preventDefault()
    const wish = {
      EmpId: selectedEmployee,
      Shift: selectedShift,
      Day: selectedDay
    }
    await wishService.postWish(wish)
    setShifts(await shiftService.getAll())
    setWishes(await wishService.getAll())
  }

  const deleteWish = async id => {
    await wishService.deleteWish(id)
    setWishes(await wishService.getAll())
    setShifts(await shiftService.getAll())
  }

  return (
    <div>
    <p>Select opening group:</p>
    <div>
      {dcTeams.map(team => 
        <GroupButton key={team}
          team={team}
          activateClick={handleGroupChange}
        />
        )}
      <button onClick={postData}>Get shifts</button>
    </div>
    <div>
      <form onSubmit={addWish}>
        <div>
          <button type="submit">Add Wish</button>
        </div>
        <div>
          Employee: <input
          value={selectedEmployee}
          onChange={handleEmployeeChange}/>
        </div>
        <div>
          Wanted Shift: <input
          value={selectedShift}
          onChange={handleShiftChange}/>
        </div>
        <div>
          Day: <input
          value={selectedDay}
          onChange={handleDayChange}/>
        </div>
      </form>
    </div>
    <div>
      {shifts.split('\n').map((i,key) => {
        return <div key={key}>{i}</div>
      })}
    </div>
    <div>
      <button onClick={handleDcChange}>change daycare</button>
    </div>
    <div>
      {wishes.map(wish =>
        <Wish key={wish.id}
        wish={wish}
        deleteClick={deleteWish}
      />
      )}
    </div>
  </div>
  );
}

export default App;
