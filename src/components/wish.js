import React from 'react'

const Wish = ({ deleteClick, wish }) => {
  
  const handleDeleteButtonClick = (event) => {
    event.preventDefault()
    deleteClick(wish.id)
  }

   return (
     <div>
       {wish.empId} , {wish.day} , {wish.shift} <button onClick={handleDeleteButtonClick}>Remove</button>
     </div>
   )
}

export default Wish