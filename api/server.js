// BUILD YOUR SERVER HERE
const express = require("express")
const User = require('./users/model')

const server = express()

server.get('/api/users', (req, res) => {
    User.find()
    .then(users => {
     res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users', 
            err: err.message,
            stack: err.stack,

        })
    })
})

server.get('/api/users/:id', (req, res) => {
User.findById(req.params.id)
    .then(users => {
        if(!users) {
            res.status(404).json({
                message: 'the user with the specified ID does not exist'
            })
        }
      res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'getting error',
            err: err.message,
            stack: err.stack,
        })
    })
})


server.use('*', (req, res)=> {
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server // EXPORT YOUR SERVER instead of {}
