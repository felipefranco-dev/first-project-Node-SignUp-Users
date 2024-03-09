const express = require("express")
const uuid = require("uuid")
const cors = require("cors")

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (request, response, next) => {

    const { id } = request.params
    const index = users.findIndex( user => user.id === id )
    
    if (index < 0) {
        return response.status(404).json({message: "user not found"})
    }

    request.userIndex = index
    request.userId = id
    
    next ()
}

app.post("/users", (request, response) => {

    const { name, age } = request.body
    const newUser = {id: uuid.v4(), name, age}

    users.push(newUser)

    return response.status(201).json(newUser)
})

app.get("/users", (request, response) => {

    return response.status(201).json(users)
})

app.delete("/users/:id", checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})