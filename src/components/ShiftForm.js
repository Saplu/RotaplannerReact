import React from 'react'
import { useSelector } from 'react-redux'

const Shifts = () => {
    const shifts = useSelector(state => state.shifts)

    return (
        <div>
          {shifts.split('\n').map((i,key) => {
            if (i.length === 0){
              return <p key={key} style={{marginTop: 25}}></p>
            }
            return <pre key={key}>{i}</pre>
          })}
        </div>
    )
}

export default Shifts