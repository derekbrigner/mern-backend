const express = require('express')
const router = express.Router()
const todoModel = require('../models/todo')

// get all todos
router.get('/todos', async (req, res) => {
    await todoModel.find(
        (err, data) => {
            if(err) return res.status(500).json({success: false})
            return res.json({success: true, data})
        }
    )
})

// get todo
router.get('/todos/:id', getTodo, async(req,res) => {
    res.json(res.todo)
})

// create todo
router.post('/todos', async (req,res) => {
    const {todoItem} = req.body

    // guard clause: check that todoItem has length
    if(todoItem.length === 0){
        return res.json({success: false, error: 'Invalid inputs.'})
    }

    //create a new TodoSchema object
    let todo = new todoModel({
        todoItem: todoItem
    })
    // save the todo to the database
    await todo.save((err) => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true})
    })
})

// update todo
router.patch('/todos/:id', getTodo, async (req,res) => {
    // get the todoItem from the request body
    const {todoItem} = req.body

    // guard clause: check that todoItem has length
    if(todoItem.length === 0){
        return res.json({success: false, error: 'Invalid inputs.'})
    }
    
    res.todo.todoItem = todoItem
    
    await res.todo.save((err) => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true})
    })
})

// delete todo
router.delete('/todos/:id', getTodo, async (req,res) => {
    await res.todo.remove((err) => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true})
    })
})

async function getTodo(req, res, next) {
    let todo
    try {
      todo = await todoModel.findById(req.params.id)
      if (todo == null) {
        return res.status(404).json({ success: false })
      }
    } catch (err) {
      return res.status(500).json({ success: false })
    }
  
    res.todo = todo
    next()
  }

module.exports = router