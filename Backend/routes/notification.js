const express = require('express')
const Project = require('../models/Project');
const Version = require('../models/Version');
const Commit = require('../models/Commit');
const User = require('../models/User')
const Notification = require('../models/Notification')

const router = express.Router();

router.get('/api/notifications/:userId', async (req, res)=>{

    const {userId} = req.params;
    console.log(userId);
    const creator = await User.findById(userId);
    try {
        const notifications = [];
        const send = await Notification.find({from: creator._id});
        const recieved = await Notification.find({to: creator._id});
        notifications.push(send)
        notifications.push(recieved)
        res.send(notifications);
    }
    catch{
        res.send({error:"error"});
    }
})

module.exports = router;