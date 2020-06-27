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
    const Dc = {
      Dc: 0
    }
    const groupObject = {
      OpenGroup: 0
    }
    daycareService.changeDc(Dc)
    shiftService.postData(groupObject)
    shiftService.getDefault(0)
      .then(newShifts => {
        setShifts(newShifts)
      })
    daycareService.getGroups(0)
      .then(newGroups => {
        setDcTeams(newGroups)
      })
  }, [])

  useEffect(() => {
    wishService
      .getAll()
      .then(newWishes => {
        setWishes(newWishes)
      })
  }, [])

  const handleEmployeeChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= dcTeams.length * 3 - 1){
      setEmployee(Number(event.target.value))
    }
  }

  const handleShiftChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= dcTeams.length * 3 - 1){
      setShift(Number(event.target.value))
    }
  }

  const handleDayChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= 14){
      setDay(Number(event.target.value))
    }
  }
  
  const handleGroupChange = async (event) => {
    await setGroup(event)
  }

  const handleDcChange = async (event) => {
    event.preventDefault()
    if (window.confirm("Sure you want to change daycare? Your selected options will be lost.")){

    
    const dcValue = (selectedDc === 0) ? 1 : 0
    setDc(dcValue)
    const Dc = {
      Dc: dcValue
    }
    setGroup(0)
    await wishService.deleteAll()
    setWishes([])
    await daycareService.changeDc(Dc)
    setShifts(await shiftService.getDefault(dcValue))
    setDcTeams(await daycareService.getGroups(dcValue))
    setEmployee(0)
    setShift(0)
    setDay(0)
  }
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
