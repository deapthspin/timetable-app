import react from 'react'

import DragNDrop from './components/DragNDrop';

import './App.css';



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
  return (
    <div className="App">
      <h1 className='app-title'>Jacob's timetable</h1>
      <header className='App-header'>
        
        <DragNDrop data={data}/>
      </header>
    </div>
  );
}

export default App;