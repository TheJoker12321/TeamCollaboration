import { readFile } from "../utils/readFile.js"

const PATH = './data/users.json'


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

async function checkUsername(req, res, next) {

    const users = JSON.parse(await readFile(PATH))

    const username = req.body.username

    const findUser = users.find((userObj) => userObj.username === username)

    if (findUser) {

        return res.status(400).json({

            error: 'The user already exists.'

        })

    }

    next()

}


export { checkUsername }