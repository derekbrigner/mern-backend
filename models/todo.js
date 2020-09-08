const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    todoItem: String
})

module.exports = mongoose.model('Todo', TodoSchema)