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


const treedata = [];
const project = {
    id:1,
    name: "project1",
    author : "Suryansh",
}


const commits = [
    {
        parent_id:1,
        child_id:2,
        commit_name:"hello1"
    },
    {
        parent_id:2,
        child_id:5,
        commit_name:"hello2"
    },
    {
        parent_id:1,
        child_id:3,
        commit_name:"hello3"
    },
    {
        parent_id:1,
        child_id:4,
        commit_name:"hello4"
    },
    {
        parent_id:2,
        child_id:6,
        commit_name:"hello5"
    },
    {
        parent_id:4,
        child_id:7,
        commit_name:"hello16"
    }
]

function bfs(treedata, project, commits){
    const obj = {
        name:project.name,
        id:project.id,
        children :[]
    }
    treedata.push(obj);
    const q = new Queue();
    q.enqueue(obj);
    while(!q.isEmpty()){
        let len = q.size();
        for (let i = 0; i < len; i++) {
            let parent = q.dequeue();
            let childs = commits.filter((ob)=> ob.parent_id===parent.id);
            childs.forEach(child => {
                let new_obj = {
                    name: child.commit_name,
                    id:child.child_id,
                    children:[]
                }
                parent.children.push(new_obj)
                q.enqueue(new_obj);
            });
              console.log(parent.id+" "+childs)
        }
    }
}
// console.log("hello");

bfs(treedata,project,commits);
// console.log(treedata);

export default treedata;
