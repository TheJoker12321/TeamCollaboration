import express from 'express'
import fs from 'fs'
import { checkIsUsername } from '../MiddleWere/checkUserAuth.js'
import { readFile } from '../utils/readFile.js'
import { checkOwner } from '../MiddleWere/checkIsOwner.js'

let idNote = 1

const notePATH = './data/notes.json'

const note = express()
note.use(express.json());

note.get('/', checkIsUsername, async (req, res) => {

    const owner = req.headers.username

    const notes = JSON.parse(await readFile(notePATH))
    const filterNotes = notes.filter((noteObj) => noteObj.owner === owner)

    res.status(200).json({

        notes: filterNotes,
        msg: 'get all username notes successfuly.'

    })

})


note.post('/', checkIsUsername, async (req, res) => {

    const owner = req.headers.username
    const content = req.body.content

    const notes = JSON.parse(await readFile(notePATH))
    notes.push({

        idNote,
        owner,
        content
    })

    idNote ++

    await fs.promises.writeFile(notePATH, JSON.stringify(notes));

    res.status(201).json({

        msg: 'note created successfuly.'
        
    })

})


note.put('/:id', checkOwner, async (req, res) => {

    const { id } = req.params
    const updatedContent = req.body.content
    console.log(updatedContent);
    

    const notes = JSON.parse(await readFile(notePATH))
    const updateNote = notes.find((noteObj) => noteObj.idNote == id)
    const indexNoteUpdated = notes.indexOf(updateNote)
    console.log(updateNote);
    

    updateNote.content = updatedContent
    notes.splice(indexNoteUpdated, 1, updateNote)

    await fs.promises.writeFile(notePATH, JSON.stringify(notes))

    res.status(204).json({

        updated: updateNote,
        msg: 'updated successfuly'

    })

})


note.delete('/:id', checkOwner, async (req, res) => {

    const { id } = req.params

    const notes = JSON.parse(await readFile(notePATH))
    const deletedNote = notes.find((noteObj) => noteObj.idNote == id)

    notes.splice(notes.indexOf(deletedNote), 1)

    await fs.promises.writeFile(notePATH, JSON.stringify(notes))

    res.status(202).json({

        msg: 'deleted successfuly'
    
    })

})


export { note }