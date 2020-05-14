import React, {useState, useEffect} from 'react';
import './App.css';
import shiftService from './services/shifts'

const App = () => {
  const [shifts, setShifts] = useState('')

  useEffect(() => {
    shiftService
      .getAll()
      .then(newShifts => {
        setShifts(newShifts)
      })
  }, [])

  return (
        <div>
          {shifts.split('\n').map((i,key) => {
            return <div key={key}>{i}</div>
          })}
        </div>
  );
}

export default App;
