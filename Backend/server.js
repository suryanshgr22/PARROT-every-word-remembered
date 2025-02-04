const express = require('express');
const methodOverride = require('method-override')
const userRoute = require('./routes/user')
const projectRoute = require('./routes/project')
const versionRoute = require('./routes/version')
const notificationRoute = require('./routes/notification')
const jwt = require('jsonwebtoken');
const jwtKey = '123abc';

const app = express();


const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/MinorProject')
.then(()=>{
  console.log("db connected");
  
})
.catch(()=>{
  console.log("Error");
  
})




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'))



app.use(userRoute)
app.use(projectRoute)
app.use(versionRoute)
app.use(notificationRoute)



const port = 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
