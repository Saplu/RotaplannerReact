import React from 'react'
import { useSelector } from 'react-redux'

const Shifts = () => {
    const shifts = useSelector(state => state.shifts)
    if (shifts.length === 0){
      return (
        <div>
          Press 'Get Shifts' if you please ^^
        </div>
      )
    }
    return (
      <div>
        {shifts.allShifts.map((i,key) => {
          if (i === null) {
            return <p key={key} style={{marginTop: 25}}></p>
          }
          return <pre key={key}>{i}</pre>
        })}
      </div>
    )
}

export default Shifts

// {shifts.split('\n').map((i,key) => {
//   if (i.length === 0){
//     return <p key={key} style={{marginTop: 25}}></p>
//   }
//   return <pre key={key}>{i}</pre>
// })}