const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
process.env.TOKEN_SECRET;


function genToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}


function Auth(req, res, next){
    const token = req.headers.authorization
    
}


module.exports = {genToken, Auth}