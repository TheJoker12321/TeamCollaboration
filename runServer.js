import { user } from "./User/userServer.js";
import { note } from "./notes/notesServer.js";
import express from 'express'

const PORT = 3001
const app = express()

app.use('/user', user)
app.use('/notes', note)


app.get('/health', (req, res) => {

    res.status(200).json({

        msg: 'The route is working'

    })

}) 


export { app, PORT }