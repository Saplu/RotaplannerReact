import React from 'react'

const Wish = ({ deleteClick, wish }) => {
  
  const handleDeleteButtonClick = (event) => {
    event.preventDefault()
    deleteClick(wish)
  }

  return (
    <div>
       Id: {wish.empId}, Shift: {wish.shift + 1}, Day: {wish.day + 1} <button onClick={handleDeleteButtonClick}>Remove</button>
    </div>
  )
}

export default Wish