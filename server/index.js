const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./model/user.model')
const Event = require('./model/event.model')
const jwt = require('jsonwebtoken')
const { events } = require('./model/event.model')

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/rivera')

app.post('/api/register', async (req, res) => {
    
	try {
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            events: []
        })
        return res.json({ status: 'ok' })
    } catch (err) {
        return res.json({ status: 'error' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email : req.body.email,
        password : req.body.password,
    })
    if(user){
        const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: token })
    }
    else
        return res.json({ status: 'error' , user : false })
})

app.post('/api/addEvent', async (req, res) => {
    
    const token = req.headers['x-access-token']


    try {
        const decoded = jwt.verify(token,'secret123')
        const email = decoded.email
        if(email != 'admin@admin.com')
            throw 'Not an admin'

        await Event.create({
            name : req.body.name,
            date : req.body.date,
            startTime : req.body.startTime,
            endTime : req.body.endTime,
            capacity : 50,
        })
        return res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        return res.json({ status: 'error', error: err })
    }
})

app.get('/api/getEvents', async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token,'secret123')
        const user = await User.findOne({email: decode.email})
        const events = await Event.find({_id: user.events})
        const totEvents = await Event.find();
        let newEvents = []
        for(let i=0;i<totEvents.length;i++){
            let f = 1
            for(let j=0;j<events.length;j++){
                if(totEvents[i]._id.toString()==events[j]._id.toString()){
                    f=0
                    break
                }
            }
            if(f)
                newEvents.push(totEvents[i])
        }
        return res.json({status: 'ok', events: newEvents})
    } catch (err) {
        console.log(err)
        return res.json({status: 'error'})
    }
})

app.get('/api/getRegEvents', async (req,res) => {

    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token,'secret123')
        const user = await User.findOne({email: decode.email})
        const events = await Event.find({_id: user.events})
        return res.json({status: 'ok', events: events})
    } catch (err) {
        console.log(err)
        return res.json({status: 'error'})
    }
})

app.post('/api/delEvent', async (req, res) => {
    
    try {
        await Event.deleteOne({id: req.body.id})
        return res.json({ status: 'ok' })
    } catch (err) {
        return res.json({ status: 'error' })
    }
})

app.post('/api/delRegEvent', async (req, res) => {
    
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token,'secret123')
        const user = await User.findOne({email: decode.email})
        const events = await Event.find({_id: user.events})
        let newEvents = []
        for(let i=0;i<events.length;i++){
            console.log(events[i]._id.toString(),req.body.id)
            if(events[i]._id != req.body.id)
                newEvents.push(events[i])
        }
        await User.updateOne({email: user.email},{$set : {events: newEvents}})
        return res.json({status: 'ok', events: events})
    } catch (err) {
        return res.json({ status: 'error' })
    }
})

app.post('/api/regEvent', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token,'secret123')
        const user = await User.updateOne(
            {email : decode.email},
            {$addToSet : {events : req.body.id}}
        )
        return res.json({ status: 'ok' })
    } catch (err) {
        console.log(err)
        return res.json({ status: 'error', error: err })
    }
})

app.post('/api/updateEvent', async (req, res) => {
    
    try {
        await Event.updateOne(
            {id: req.id},
            {
                name : req.body.name,
                date : req.body.date,
                startTime : req.body.startTime,
                endTime : req.body.endTime,
            }
        )
        return res.json({ status: 'ok' })
    } catch (err) {
        return res.json({ status: 'error' })
    }
})


app.listen(1337,()=>{
    console.log("Server started at port 1337")
})