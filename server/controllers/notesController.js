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

}
const deleteNote = async(req,res)=>{

}

module.exports = {fetchAllNotes, fetchNotesbyId, createNote, updateNote, deleteNote}