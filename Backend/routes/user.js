const express = require('express')
const User = require('../models/User');
const Project = require('../models/Project');
const router = express.Router();
const {genToken, Auth} = require('./Auth/Auth')

//signup
router.post('/api/signup',async (req,res)=>{
    const {username, email, password} = req.body;
    const user = await User.create({
        username,
        email,
        password
    });
    const token = genToken(user.username);
    console.log(token)
    res.json(token)

})


router.post('/api/login', async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.find({email:email});
    if(user == undefined || user == null){
        res.send({error:"User not found!"})
    }
    if(user[0].password === password){
        const token = genToken(user.username);
        console.log(token)
        res.json(token)
    }else{
        console.log(user[0].password);
        console.log(password)
        res.send({error:"User not found!"})
    }
})

router.get('/api/user/:userId', async(req, res)=>{
    console.log("user get reched")
    const {userId} = req.params;
    const userdata = await User.findById(userId);
    const projects_list = await Project.find({createdBy:userdata._id});
    console.log(projects_list)
    const response = { ...userdata.toObject(), projects: projects_list };

    res.send(response);
})


module.exports = router;