import { readFile } from '../utils/readFile.js'


const PATH = './data/users.json'


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

async function checkIsUsername(req, res, next) {

    const username = req.headers["username"]

    const users = JSON.parse(await readFile(PATH))
    const userFound = users.find((userObj) => userObj.username === username)

    if (!userFound) {

        return res.status(401).json({

            error: 'user not found'

        })

    }

    next()

}


export { checkIsUsername }