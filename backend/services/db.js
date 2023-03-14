const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

//using mongoose define connection string

mongoose.connect('mongodb://localhost:27017/Chat', ()=>{
    console.log("Mongo db connected successfully");
})



const Contact = mongoose.model('Contact', {
    username:String,
    profilepic:String,
    phone:Number, 
    password:String, 
    messages:[],
    contacts:[]

})
module.exports={
    Contact
}