import React from 'react';
import './App.css';
import GroupSelect from './components/GroupSelect'
import { useSelector } from 'react-redux'
import WishForm from './components/WishForm'
import Identification from './components/IdForm'
import ShiftForm from './components/ShiftForm'

const App = () => {
  const dcTeams = useSelector(state => state.groups.groups)

  return (
    <div>
      <GroupSelect count={dcTeams.length}/>
      <Identification/>
      <WishForm/>
      <ShiftForm/>
    </div>
  );
}

export default App;