import { readFile } from '../utils/readFile.js'


const PATH = './data/notes.json'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

async function checkOwner(req, res, next) {

    const username = req.headers["username"]

    const notes = JSON.parse(await readFile(PATH))    
    const noteFound = notes.find((noteObj) => noteObj.owner === username)

    if (!noteFound) {

        return res.status(403).json({

            error: 'you are not owner of this note'
        
        })
    
    }

    next()

}


export { checkOwner }