import React, {useState, useEffect} from 'react';
import './App.css';
import shiftService from './services/shifts'
import wishService from './services/wishes'
import Wish from './components/wish'
import GroupSelect from './components/GroupSelect'
import { useSelector } from 'react-redux'
import WishForm from './components/WishForm'
import Identification from './components/IdForm'

const App = () => {
  const [shifts, setShifts] = useState('')
  const [selectedEmployee, setEmployee] = useState(0)
  const [selectedShift, setShift] = useState(1)
  const [selectedDay, setDay] = useState(1)
  const [wishes, setWishes] = useState([])
  const [user, setUser] = useState('')
  const [currentSet, setCurrentSet] = useState('default')
  const testGroup = useSelector(state => state.groups.selectedGroup)
  const testDc = useSelector(state => state.groups.selectedDaycare)
  const dcTeams = useSelector(state => state.groups.groups)

  const state = useSelector(state => state)
  //console.log(state.wishes)
  //console.log(state.id)

  const handleEmployeeChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= dcTeams.length * 3 - 1){
      setEmployee(Number(event.target.value))
    }
  }

  const handleShiftChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= dcTeams.length * 3){
      setShift(Number(event.target.value))
    }
  }

  const handleDayChange = (event) => {
    if (!isNaN(event.target.value) && Number(event.target.value) <= 15 && Number(event.target.value) >= 1){
      setDay(Number(event.target.value))
    }
  }

  const handleUserChange = (event) => {
    event.preventDefault()
    setUser(event.target.value)
  }

  const handleSetChange = (event) => {
    event.preventDefault()
    setCurrentSet(event.target.value)
  }

  const getShifts = async (event) => {
    event.preventDefault()
    setShifts(await shiftService.getShifts(testDc, testGroup))
  }

  const addWish = async (event) => {
    event.preventDefault()
    if (user !== ''){
      const wish = {
        EmpId: selectedEmployee,
        Shift: selectedShift - 1,
        Day: selectedDay - 1,
        Creator: user,
        Set: currentSet
      }
      console.log(wish)
      await wishService.postWish(wish)
      setShifts(await shiftService.getShifts(testDc, testGroup, user, currentSet))
      setWishes(await wishService.getSpecific(user, currentSet))
      setEmployee(0)
      setShift(1)
      setDay(1)
    }
    else setShifts('Identify yourself')
  }

  const deleteWish = async wish => {
    await wishService.deleteWish(wish)
    setWishes(await wishService.getSpecific(user, currentSet))
    setShifts(await shiftService.getShifts(testDc, testGroup, user, currentSet))
  }

  const getWishes = async () => {
    if (user.length > 0){
      setWishes(await wishService.getSpecific(user, currentSet))
      setShifts(await shiftService.getShifts(testDc, testGroup, user, currentSet)) 
      await wishService.deleteSet(user, 'default')
      const newWishes = await wishService.getSpecific(user, currentSet)
      newWishes.forEach(w => w.set = 'default')
      await newWishes.forEach(w => wishService.postWish(w))
      setCurrentSet('default')
    }
    else (setShifts('Identify yourself')) 
  }

  const deleteWishSet = async () => {
    if (wishes.length !== 0){
      await wishService.deleteSet(user, currentSet)
      setWishes(await wishService.getSpecific(user, currentSet))
      setShifts(await shiftService.getShifts(testDc, testGroup, user, currentSet))
    }
  }

  return (
    <div>
      <p>Select opening group:</p>
      <div>
        <GroupSelect count={dcTeams.length}/>
        <button className="Padded" onClick={getShifts}>Get shifts</button>
        <input className="Padded" value={user} onChange={handleUserChange}/>
        <input className="Padded" value={currentSet} onChange={handleSetChange}/>
        <button className="Padded" onClick={getWishes}>Get Wishes</button>
      </div>
      <Identification/>
      <WishForm/>
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
          if (i.length === 0){
            return <p key={key} style={{marginTop: 25}}></p>
          }
          return <pre key={key}>{i}</pre>
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
      <div>
        <button onClick={deleteWishSet}>Delete all above wishes</button>
      </div>
    </div>
  );
}

export default App;