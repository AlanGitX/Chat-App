const express = require('express')

const cors = require('cors')

const Server = express();
const dataService = require('./services/dataService')

const jwt = require('jsonwebtoken')

Server.use(cors({
    origin:'http://localhost:4200'
}))


//parse json
Server.use(express.json())

//set up port number 

Server.listen(3000,()=>{
    console.log("server started at 3000");
})


const appMiddleware = (req,res,next)=>{
    console.log('app sp middleware')
    next()
}

Server.use(appMiddleware)

const jwtMiddleware = (req,res,next)=>{
    const token = req.headers['access-token']
    try{
        const data = jwt.verify(token,"nissangtr")
        next()
    }
    catch{
        res.status(401).json({
            message: 'please login'
        })
    }
}


Server.post('/register',(req,res)=>{
    console.log("inside register function");
    console.log(req.body);
    dataService.register(req.body.pno,req.body.pswd,req.body.uname,req.body.photo).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})


Server.post('/login',(req,res)=>{
    console.log("inside function");
    console.log(req.body);
    dataService.login(req.body.pno,req.body.pswd).then((result)=>{
        res.status(result.statusCode).json(result)

    })
})

Server.get('/all-contacts',jwtMiddleware, (req,res)=>{
    dataService.allContacts().then((result)=>{
        res.status(result.statusCode).json(result)
    })

})

Server.post('/msg-update',jwtMiddleware,(req,res)=>{
    dataService.msgUpdate(req.body.msg,req.body.toPhn,req.body.fromPh,req.body.dir).then((result)=>{
        res.status(result.statusCode).json(result)

    })

})
Server.post('/getChat',jwtMiddleware, (req,res)=>{
    dataService.getChat(req.body.phn).then((result)=>{
        res.status(result.statusCode).json(result)
    })

})


