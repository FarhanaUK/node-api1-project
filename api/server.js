// BUILD YOUR SERVER HERE
const express = require("express")
const User = require('./users/model')

const server = express()
server.use(express.json())

server.post("/api/users", (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message:"Please provide name and bio for the user",
    });
  } else {
    User.insert(user)
      .then((crreateUser) => {
       res.status(201).json(crreateUser)
      })
      .catch((err) => {
        res.status(500).json({
          message: "creating users",
          err: err.message,
          stack: err.stack,
        });
      });
  }
});



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

server.delete("/api/users/:id", async (req, res) => {
const userToDelete = await User.findById(req.params.id)
if(!userToDelete) {
    res.status(404).json({
        message: "The use does not exist"
    })
}else {
    const deleted = await User.remove(userToDelete.id)
    res.status(200).json(deleted)
}
});


server.put("/api/users/:id", async (req, res) => {
try{
    const possibleUser = await User.findById(req.params.id)
    if(!possibleUser){
        res.status(404).json({
            message: 'The user does not exist'
        })
    }else if(!req.body.name || !req.body.bio) {
        res.status(400).json({
            message: "Please provide name and bio for the user"
        })
    }else{
        const updateUser = await User.update(
            req.params.id,
            req.body,
        )
        res.status(200).json(updateUser)
    }
    }

catch(err) {
        res.status(500).json({
          message: "creating users",
          err: err.message,
          stack: err.stack,
        });
}
})

server.use('*', (req, res)=> {
    res.status(404).json({
        message: 'not found'
    })
})
module.exports = server // EXPORT YOUR SERVER instead of {}
