require('dotenv').config()

const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const bodyParser = require('body-parser') 
const todosRouter = require('./routes/todos')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

mongoose.connection.on('error', (error => console.error(error)))
mongoose.connection.once('open', function(){
    console.log('Database Connection Success')

    const app = express();

    app.use(cors())
    app.use(bodyParser.json())

    app.use( '/api', todosRouter )
    
    app.listen(3001, () => console.log('Server Started'))
})