const express = require('express')
const User = require('./models/user')
require('./db/mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/api/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/api/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndUpdate(_id, req.body)
        if (!user) {
            return res.status(400).send()
        }
        await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send() 
    }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send() 
    }
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
