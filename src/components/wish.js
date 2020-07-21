import React from 'react'

const Wish = ({ deleteClick, wish }) => {
  
  const handleDeleteButtonClick = (event) => {
    event.preventDefault()
    deleteClick(wish)
  }

   return (
     <div>
       {wish.empId} , {wish.shift} , {wish.day} <button onClick={handleDeleteButtonClick}>Remove</button>
     </div>
   )
}

export default Wish