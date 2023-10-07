const Note = require("../models/note")

const fetchAllNotes = async(req,res)=>{
 const notes = await Note.find({})
  res.json({notes})
}

const fetchNotesbyId = async(req,res)=>{
  const noteId = req.params.id
  console.log(noteId)
  const note = await Note.findById(noteId)
  if(!note) res.send("note not found")
  res.json({note})
}
const createNote = async(req,res)=>{
    const {title, description} = req.body
    const note = await Note.create({title, description})
    res.json({note})
}
const updateNote = async(req,res)=>{
    // getData to update with
     const {title,description} = req.body
    //get the data
    const noteId = req.params.id
    const note = await Note.findByIdAndUpdate(noteId, {title,description}, {new : true})
    res.json({note})

}
const deleteNote = async(req,res)=>{
    const noteId = req.params.id
    const note = await Note.findByIdAndDelete(noteId)
    res.json(note)
}

module.exports = {fetchAllNotes, fetchNotesbyId, createNote, updateNote, deleteNote}