const express = require('express')
const Project = require('../models/Project');
const Version = require('../models/Version');
const Commit = require('../models/Commit');
const User = require('../models/User')
const Notification = require('../models/Notification')

const router = express.Router();

router.get('/api/versions/:version', async (req, res)=>{

    const {version} = req.params;
    // console.log(userId);
    const versiondata = await Version.findById(version);
    res.send(versiondata)
})



// ver : 67433fdfad39df1e1a2af2e2
// pid : 67433fdfad39df1e1a2af2e4
// auther : 6741db634905595030ee85f0
router.post('/api/version/create',async(req,res)=>{
    
    const {version, pid, content, message, author} = req.body;
    // console.log(version, pid, content, message, author);

    try{
        console.log("reached")
        //getting creater from user
        const creator = await User.findById(author);
        
        console.log("reached0")
        // creating the version
        const child = await Version.create({
            content:content,
            author:creator._id
        })

        console.log("reached1")
        // finding it's parent version
        const parent_version = await Version.findById(version);


        //finding the project of the version
        const project = await Project.findById(pid);
        let c = creator._id;
        let u = project.createdBy;
        console.log(c);
        console.log(u);
        if(!c.equals(u)){
            console.log("XXXXXXXXX")
            const to = await User.findById(project.createdBy);
            // console.log(to)
            const noti = await Notification.create({
                to:to._id,
                from:creator._id,
                project:project._id,
                projectname:project.name,
                parent:parent_version._id,
                child:child._id,
                message:message,

            })
            console.log("XXXXXXXXX12")
            res.send({done:"done bro!"})
        }else{
            console.log("reached2")
            // creating the commit
            const newCommit = await Commit.create({
                project:project._id, 
                parent:parent_version._id,
                child:child._id,
                message:message,
                createdBy:creator._id,
                head:false
            })
            console.log("reached3")
            res.send(newCommit);
        }

    }catch{
        res.send({error:"errorprojrct"})
    }
})


router.post('/api/version/commit',async(req,res)=>{
    console.log("reached at commit")
    const {notification} = req.body;
    const {to , from, project, parent, child, message} = notification;
    console.log(to , from, project, parent, child, message);
    try{
        const projectc = await Project.findById(project);
        const parentc = await Version.findById(parent);
        const childc = await Version.findById(child);
        const createdBy = await User.findById(from);
        const commit = await Commit.create({
            project:projectc._id,
            parent:parentc._id,
            child: childc._id,
            createdBy:createdBy._id,
            message:message,
            head:true
        })
        res.send({success:"commit created"})
    }
    catch{
        res.send({failed:"commit failed"})
    }
})


router.patch('/api/version/status',async(req,res)=>{
    const {notification} = req.body;
    try {
        const noti = await Notification.findByIdAndUpdate(notification._id,
            {status: "Accepted"}
        );
        res.send({success:"Yes"})
    } catch (error) {
        res.send(error)
    }

})






module.exports = router;