import react, { useState } from 'react'

import DragNDrop from './components/DragNDrop';
import AlarmIcon from '@mui/icons-material/Alarm';
import './App.css';
import { Button, TextField, ToggleButton } from '@mui/material';



function App() {
  let data = localStorage
  .getItem('data') ? JSON.parse(localStorage
  .getItem('data'))  : [
    {title: 'Bin', items: []},

    {title: 'Collection point', items: []},
    {title: 'Monday', items: []},
    {title: 'Tuesday', items: []},
    {title: 'Wednesday', items: []},
    {title: 'Thursday', items: []},
    {title: 'Friday', items: []},
    {title: 'Saturday', items: []},
    {title: 'Sunday', items: []}
  ]

  const [pdGap, setPdGap] = useState(15)
  const [pd, setPd] = useState(false)

  function pdHandler(e) {
    setPdGap(e.target.value)
  }

  function pdChange(e) {
    e.preventDefault()

    if((pdGap * 1) > 0) {
      setPd(!pd)
    }

    console.log(pd)
  }

  setInterval(() => {
    if(pd === true && pdGap * 1) {
      new Notification('do pomodoro')
      console.log(pd, pdGap)
    }
  }, (pdGap * 1) && pd ? pdGap * 60000 : 60000)

  // setInterval(() => {
  //   console.log(pd)
  // }, 1000)

  return (
    <div className="App">
      <div className='pomodoro'>
        <TextField placeholder='time (m)' value={pdGap} onChange={pdHandler}/>
        <br/>
        <br/>
        <ToggleButton
          value="check"
          // selected={false}
          onChange={pdChange}
        >
          <AlarmIcon/>
          ({`${pd}`})
        </ToggleButton>
      </div>


      <h1 className='app-title'>Jacob's timetable</h1>


      <header className='App-header'>
        
        <DragNDrop data={data}/>
      </header>
      
    </div>
  );
}

export default App;