const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/user', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.get('/user', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/user/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/user/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }
        res.send(user)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.delete('/user/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router