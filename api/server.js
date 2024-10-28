// BUILD YOUR SERVER HERE
const express = require("express")
const User = require('./users/model')

const server = express()

server.use(express.json())

server.use('*', (req, res)=> {
    res.status(404).json({
        message: 'not found'
    })
})

server.get('/api/users', async (req, res) => {

try{
const users = await User.find()
console.log(users)
res.status(200).json(users)
}
catch(err){
    res.status(500).json({ message: `Something Horrible ${err.message}` })

}
})

server.get('/api/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(user => {
       if(!user) {
res.status(404).json({message: "the user does not exist"})
       }
      
    })
    .catch(err => {
        res.status(500).json({
         message: 'Error fetching',
         err: err.message, 
         stack: err.stack })
    })
})

module.exports = server // EXPORT YOUR SERVER instead of {}
