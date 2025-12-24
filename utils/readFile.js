import fs from 'fs'

/**
 * 
 * @param {*} path 
 * @returns 
 */

async function readFile(path) {

    const data = await fs.promises.readFile(path, 'utf8')
    
    return data

}

export { readFile }