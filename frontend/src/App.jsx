import { useEffect, useState } from 'react'
import  axios  from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [notes, setNotes] = useState(null)
  const [createForm, setCreateForm] = useState({title:"", description:""})
  const [updateForm, setUpdateForm] = useState({_id:null,title:"", description:""})
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
  const updateCreateFormField = (e) =>{
    const {name,value} = e.target
    setCreateForm({
      ...createForm,
      [name]:value
    })
  }
  const handleUpdateFieldChange = (e) =>{
    const {name, value} = e.target 
    setUpdateForm({
      ...updateForm,
      [name]:value
    })
  }
  const createNote = async (e)=>{
    e.preventDefault()
    //create a note
   const res = await axios.post('http://localhost:3000/', createForm)
   console.log(res)
   setNotes([...notes, res.data.note])
   setCreateForm({title:"", description:""})
  }
  const updateNote = async (e)=>{
    e.preventDefault()
    const {title, description} = updateForm
    const res = await axios.put(`http://localhost:3000/${updateForm._id}`,{title, description})
    //update Notes
    const newNotes = [...notes]
    
    //finding index of update note
    const noteIndex = notes.findIndex(note=>{
      return note._id === updateForm._id
    })
    //updating note array
    newNotes[noteIndex] = res.data.note
    setNotes(newNotes)
    //clear  update form state
    setUpdateForm({_id:null,title:'',body:''})

  }
  const toggleUpdate = async (note)=>{
    // get the current note value
    setUpdateForm({_id:note._id,title:note.title, description:note.description})
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

  {/* Update Form for note */}
  {updateForm._id &&
  <div>
    <h1>Update a form</h1>
    <form onSubmit={updateNote}>
      <input onChange={handleUpdateFieldChange} type="text" name='title' value={updateForm.title}/>
      <textarea onChange={handleUpdateFieldChange} type="text" name='description' value={updateForm.description}/>
      <button type="submit">Update Note</button>
    </form>
  </div>
  }


   {/* Create a note Form */}
   {!updateForm._id &&
   <div>
   <h1>Create a Note Form</h1>
   <form onSubmit={createNote}>
     <input type="text" name='title' value={createForm.title} onChange={updateCreateFormField}/>
     <textarea type="text" name='description' value={createForm.description} onChange={updateCreateFormField}/>
     <button type='submit'>Submit</button>
   </form>
  </div>}
   </>
  )
}

export default App
