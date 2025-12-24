import { app, PORT } from "./runServer.js";


app.listen(PORT, () => {

    console.log(`start to run server on port "http/localhost:${PORT}"`);
    
})