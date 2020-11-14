const express = require('express')
const Task = require('../models/task')

const router = express.Router()

router.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(422).send(error)
    }
})



router.get('/task', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/task/:id', async (req, res) => {
    try{
        const task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/task/:id', async (req, res) => {
    try{
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }

        Object.keys(req.body).forEach((property) => task[property] = req.body[property])
        await task.save()

        res.send(task)
    } catch (error) {
        res.status(422).send(error)
    }
})

router.delete('/task/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send({status: 404, message: 'Our bad! We did not find your expected data'})
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router