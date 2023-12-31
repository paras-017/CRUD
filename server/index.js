if(process.env.NODE_ENV != "production"){
    require('dotenv').config
}
require('dotenv').config()
const express = require('express')
const { fetchAllNotes, fetchNotesbyId, createNote, updateNote, deleteNote } = require('./controllers/notesController')
const connectToDb = require('./database/mongoDbconnect')
const router = express.Router()
const app = express()
const port = process.env.PORT || 8000
const cors = require('cors');
app.use(cors());
app.use(express.json());
connectToDb()


app.post('/', createNote)
app.get('/', fetchAllNotes)
app.get('/:id', fetchNotesbyId)
app.put('/:id', updateNote)
app.delete('/:id', deleteNote)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})