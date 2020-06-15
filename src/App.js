import React, {useState, useEffect} from 'react';
import './App.css';
import shiftService from './services/shifts'
import wishService from './services/wishes'
import Wish from './components/wish'

const App = () => {
  const [shifts, setShifts] = useState('')
  const [group, setGroup] = useState(0)
  const [selectedEmployee, setEmployee] = useState(0)
  const [selectedShift, setShift] = useState(0)
  const [selectedDay, setDay] = useState(0)
  const [wishes, setWishes] = useState([])

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

  const handleEmployeeChange = (event) => {
    setEmployee(Number(event.target.value))
  }

  const handleShiftChange = (event) => {
    setShift(Number(event.target.value))
  }

  const handleDayChange = (event) => {
    setDay(Number(event.target.value))
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
      <button onClick={() => handleGroupChange(0)}>1</button>
      <button onClick={() => handleGroupChange(1)}>2</button>
      <button onClick={() => handleGroupChange(2)}>3</button>
      <button onClick={() => handleGroupChange(3)}>4</button>
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
