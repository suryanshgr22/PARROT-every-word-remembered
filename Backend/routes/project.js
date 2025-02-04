const express = require('express')
const Project = require('../models/Project');
const Version = require('../models/Version');
const Commit = require('../models/Commit');
const User = require('../models/User')
const bfs = require('./tree')
const router = express.Router();

router.get('/api/projects/:userId', async (req, res)=>{

    const {userId} = req.params;
    // console.log(userId);
    const creator = await User.findById(userId);
    const projects_list = await Project.find({createdBy:creator._id});
    res.send(projects_list)
})

router.get('/api/projectsall/:userId', async (req, res)=>{
    console.log('reached');
    const {userId} = req.params;
    console.log('reached');
    const user = await User.findById(userId)
    const projects_list = await Project.find({ createdBy: { $ne: user._id } });

    res.send(projects_list)
})




router.post('/api/project/create',async(req,res)=>{
    // console.log("reached")
    const {user, projectName, projectDescription} = req.body;
    // console.log(user, projectName, projectDescription);

    try{
        // console.log(user, projectName, projectDescription, "test1");
        const creator = await User.findById(user);
        // console.log(user, projectName, projectDescription, "test2");
        const firstver = await Version.create({
            content:"",
            author:creator._id
        })
        const project = await Project.create({
            createdBy:creator._id,
            name:projectName,
            description:projectDescription,
            first:firstver._id
        });

        // console.log(project);
        res.send(project);
    }catch{
        res.send({error:"errorprojrct"})
    }
})

router.get('/api/project/:projectId', async (req, res)=>{
    const {projectId} = req.params;
    console.log(projectId);
    const project = await Project.findById(projectId);
    // const commits = await Commit.find({project:project._id})

    // console.log(commits)
    
    const treedata = await bfs(project);
    res.send(treedata)
})




module.exports = router;