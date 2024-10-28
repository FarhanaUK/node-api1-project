const server = require('./api/server');

const port = 9000;

const express = require("express")

server.get('/api/users', async (req, res) => {

})

server.listen(port, () => {

    console.log(`server start on ${port}`)
})