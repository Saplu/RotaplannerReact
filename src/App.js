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
    shiftService.getShifts(selectedDc, group)
      .then(newShifts => {
        setShifts(newShifts)
      })
    daycareService.getGroups(selectedDc)
      .then(newGroups => {
        setDcTeams(newGroups)
      })
  }, [selectedDc, group])

  useEffect(() => {
    wishService
      .getSpecific('saplu', 'default')
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
      await daycareService.changeDc(Dc)
      //await shiftService.clearGroups()
      setShifts(await shiftService.getShifts(dcValue, 0))
      setDcTeams(await daycareService.getGroups(dcValue))
      setEmployee(0)
      setShift(0)
      setDay(0)
    }
  }

  const getShifts = async (event) => {
    event.preventDefault()
    setShifts(await shiftService.getShifts(selectedDc, group))
  }

  const addWish = async (event) => {
    event.preventDefault()
    const wish = {
      EmpId: selectedEmployee,
      Shift: selectedShift,
      Day: selectedDay,
      Creator: 'saplu',
      Set: 'default'
    }
    await wishService.postWish(wish)
    setShifts(await shiftService.getShifts(selectedDc, group))
    setWishes(await wishService.getSpecific('saplu', 'default'))
    setEmployee(0)
    setShift(0)
    setDay(0)
  }

  const deleteWish = async wish => {
    await wishService.deleteWish(wish)
    setWishes(await wishService.getSpecific('saplu', 'default'))
    setShifts(await shiftService.getShifts(selectedDc, group))
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
      <button onClick={getShifts}>Get shifts</button>
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
