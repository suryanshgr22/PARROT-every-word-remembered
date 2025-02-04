const mongoose = require('mongoose');
const Project  = require('../models/Project');
const  Commit  = require('../models/Commit');
const Version  = require('../models/Version');

class Queue {
    constructor() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
 
    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
        return item;
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        
        if (this.isEmpty()) {
            this.frontIndex = 0;
            this.backIndex = 0;
        }
        
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.frontIndex];
    }
    
    size() {
        return this.backIndex - this.frontIndex;
    }
    
    isEmpty() {
        return this.size() === 0;
    }
    
    clear() {
        this.items = {};
        this.frontIndex = 0;
        this.backIndex = 0;
    }
}


// const treedata = [];
// const project = {
//     id:1,
//     name: "project1",
//     author : "Suryansh",
// }


// const commits = [
//     {
//         parent_id:1,
//         child_id:2,
//         commit_name:"hello1"
//     },
//     {
//         parent_id:2,
//         child_id:5,
//         commit_name:"hello2"
//     },
//     {
//         parent_id:1,
//         child_id:3,
//         commit_name:"hello3"
//     },
//     {
//         parent_id:1,
//         child_id:4,
//         commit_name:"hello4"
//     },
//     {
//         parent_id:2,
//         child_id:6,
//         commit_name:"hello5"
//     },
//     {
//         parent_id:4,
//         child_id:7,
//         commit_name:"hello16"
//     }
// ]
// ver : 67433fdfad39df1e1a2af2e2

async function bfs(project){
    const treedata = [];
    const obj = {
        p_id:project._id,
        name:project.name,
        id:project.first,
        children :[],
        createdBy:project.createdBy,
        description:project.description
    }
    treedata.push(obj);
    const q = new Queue();
    q.enqueue(obj);
    while(!q.isEmpty()){
        let len = q.size();
        for (let i = 0; i < len; i++) {
            let parent = q.dequeue();
            let parentVersion = await Version.findById(parent.id);
            let childs = await Commit.find({parent:parentVersion._id})
            // console.log(childs)
            childs.forEach(child => {
                // console.log(child)
                let new_obj = {
                    head:child.head,
                    name: child.message,
                    id:child.child,
                    children:[]
                }
                parent.children.push(new_obj)
                q.enqueue(new_obj);
            });
            //   console.log(parent.id+" "+childs)
        }
    }
    return treedata;
}
// console.log("hello");


// console.log(treedata);

module.exports = bfs;
