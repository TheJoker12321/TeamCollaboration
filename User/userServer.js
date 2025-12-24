import express from 'express';
import { checkUsername } from '../MiddleWere/checkUser.js';
import fs from 'fs';
import { readFile } from '../utils/readFile.js';

const PATH = './data/users.json';

const user = express();
user.use(express.json());

let id = 1;

user.post('/register', checkUsername, async (req, res) => {

    const username = req.body.username;

    const users = JSON.parse(await readFile(PATH));
    users.push({

        id, 
        username
    
    });

    id ++;

    await fs.promises.writeFile(PATH, JSON.stringify(users));

    return res.status(201).json({

        msg: 'user created successfuly'

    });

});


export { user }