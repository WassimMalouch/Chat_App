const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat=require("stream-chat").StreamChat;
const uniqid = require('uniqid');
const jwtDecode = require("jwt-decode")
require("dotenv").config();
const api_key=process.env.STREAM_API_KEY
const api_secret=process.env.STREAM_API_SECRET
const app_id=process.env.STREAM_APP_ID


const login=async(req,res)=>{
    try {
        const {username , password }=req.body;
        const serverClient = connect(api_key,api_secret,app_id);
        const client =StreamChat.getInstance(api_key,api_secret);
        const {users}= await client.queryUsers({name:username});

        if(!users.length)
            return res.status(400).json({message:"user not found"})

        const token=serverClient.createUserToken(users[0].id)
        const success=bcrypt.compareSync(password, users[0].hashedPassword);
        if(success)
         res.status(200).json({token,fullname : users[0].fullname ,username,userID:users[0].id})
         else 
         res.status(500).json({message: "wrong password"})
    } catch (error) {
        res.status(500).json({message: "hello"})
    }
}

const signup=async ( req, res)=>{
    try {
        const saltRounds = 10;
        const {fullName , username , password , phoneNumber }=req.body;
        const userID=uniqid();
        const serverClient = connect(api_key,api_secret,app_id);
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const token = serverClient.createUserToken(userID,{password:hashedPassword});
        res.status(200).json({token,fullName,username,userID,hashedPassword,phoneNumber});
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}


module.exports={signup,login}