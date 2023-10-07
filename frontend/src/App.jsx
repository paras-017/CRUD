import { useEffect, useState } from 'react'
import  axios  from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [notes, setNotes] = useState(null)
  const fetchAllNotes = async ()=>{ 
   const res = await axios.get('http://localhost:3000')
   setNotes(res.data.notes)
  }
  const deleteNote = async (_id)=>{
    const note = await axios.delete(`http://localhost:3000/${_id}`)
    const newNote = [...notes].filter(note=>{
      return note._id != _id
    })
    setNotes(newNote)
  }
  useEffect(() => {
    fetchAllNotes()
  }, [])
  
  return (
   <>
   <h1>Notes</h1>
   {/* DISPLAY NOTES */}
   {notes && notes.map((note)=>{
    return (
      <div key={note._id}>
        <h1>Title: {note.title}</h1>
        <h1>Description: {note.description}</h1>
        <button onClick={()=>deleteNote(note._id)}>Delete</button>
        <button onClick={()=>toggleUpdate(note)}>Edit</button>
      </div>
    )
   })}
   </>
  )
}

export default App
