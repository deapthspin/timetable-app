import { Button, TextField } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import react, {useEffect, useRef, useState} from 'react'
import AdapterDateFns from '@material-ui/lab/AdapterDateFns'
import ColorPicker from 'material-ui-color-picker'

function DragNDrop({data}) {
    let [list, setList] = useState(data)
    let[listTest, setListTest] = useState()
    const [dragging, setDragging] = useState(false)
    const [currentlyDragging, setCurrentlyDragging] = useState("")
    const [name, setName] = useState('')
    const [value, setValue] = useState(undefined)
    const [updated, setUpdated] = useState(false)
    const [blockColor, setBlockColor] = useState('#000')

    // localStorage.removeItem('data')
    const dragItem = useRef()
    const dragNode = useRef()

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(list))
    }, [list])
   
    const handleDragStart = (e, params) => {
        setUpdated(false)
        setCurrentlyDragging(e.target.innerHTML)
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd) 
        setTimeout(() => {
            setDragging(true)
        }, 0)

    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current
        setUpdated(false)
      
        if(e.target !== dragNode.current) {
            
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))

                
                    newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0])
                
                    if(params.grpI === 0) {
            
                        
        
                    
                }

                console.log(params.grpI)
                    
               
                
                
                dragItem.current = params
                setListTest(listTest = newList)
        localStorage.setItem('data', JSON.stringify(list))
        localStorage.setItem('test', JSON.stringify(newList))

                return newList
            })
            console.log(list)
        setUpdated(true)

        }
    }

    const handleDragEnd = () => {
        console.log(dragItem.current.grpI)
        let thing;
        if(dragItem.current.grpI === 0 && updated) {
            thing = JSON.parse(localStorage.getItem('data'))
           thing[0].items.splice(0, 1)
        console.log('still ',)
        setList(list = thing)
        }
        setDragging(false)

        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null
        dragNode.current = null
    }

    function addBlock() {

        if(name && value && name.length <= 100) {
            // console.log(list[0].items.push(name))
        list[1].items.push([`${name}`, `${value.toString().split(' ')[4].split(":")[0] * 1 > 12 ? (value.toString().split(' ')[4].split(":")[0] * 1) -12 : value.toString().split(' ')[4].split(":")[0]}:${value.toString().split(' ')[4].split(":")[1]}${value.toString().split(' ')[4].split(":")[0] * 1 > 12 ? 'pm' : value.toString().split(' ')[4].split(":")[0] * 1 === 12 ? 'pm' : 'am'}`, blockColor])
        console.log(list)
        localStorage.setItem('data', JSON.stringify(list))
        setTimeout(() => {
            setName('')
        }, 0)
        }
        
    }

    function onNameChange(e) {
        if(e.target.value.length < 100) {
            setName(oldName => e.target.value)
        }
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current
        if(currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            return 'current dnd-item'
        }
        return 'dnd-item'
    }

    return (
        <div className='drag-n-drop'> 
    
        {list.map((grp, grpI) => (
          <div
           className={grp.title === "Bin" ? "dnd-bin" :'dnd-group'} 
           key={grp.title}
           onDragEnter={dragging && !grp.items.length ? (e) => {handleDragEnter(e, {grpI, itemI: 0})} : null}
        >
            {grp.title === "Collection point" ? <div>
                <TextField label="name" onChange={onNameChange} value={name} className="name-picker"/>
                
                <LocalizationProvider dateAdapter={AdapterDateFns} >
  <TimePicker
    label="Set Time"
    className='time-picker'
    value={value}
    
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
    
  />
</LocalizationProvider>
 <div className='colors'>
    <div className='color-pad blue' style={{backgroundColor: 'rgb(77, 160, 255)' }} onClick={() => {
        setBlockColor('rgb(77, 160, 255)')
    }}></div>
    <div className='color-pad white' style={{backgroundColor: 'white'}} onClick={() => {
        setBlockColor('white')
    }}></div>
</div>
{/* <ColorPicker
name="color"
    defaultValue='COLOR'
    onChange={color => {
        if(color) {
            setBlockColor(color)
        }
        
    }}
/> */}

<Button onClick={addBlock} variant="contained">add</Button>

            </div> : null}
            <div className='group-title'>{grp.title}</div>
            {grp.items.map((item, itemI) => item !== "" ? ( 
              <div
               draggable 
               onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
               onDragEnter={dragging ? (e) => {handleDragEnter(e, {grpI, itemI})} : null }
               key={`${item}-id:${itemI}`} 
               className={dragging ? getStyles({grpI, itemI}) : "dnd-item"}
               style={{backgroundColor: item[2]}}
            >
                
                
                <div className='itemtextthing'>

                    <h2 className='item-name'>{item[0]}</h2>
                    <br/>
                    <h4 className='item-time'>{item[1]}</h4>
                </div>
              </div>
            ) : ( 
                <div
                  
                 onDragStart={(e) => {handleDragStart(e, {grpI, itemI})}} 
                 onDragEnter={dragging ? (e) => {handleDragEnter(e, {grpI, itemI})} : null }
                 key={`${item}-id:${itemI}`} 
                 className="current dnd-item"
              >
                  {item}
                </div>
              ) )}

          </div>
        ))}
        </div>
    )
}

export default DragNDrop