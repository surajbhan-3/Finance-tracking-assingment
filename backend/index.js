const express = require("express")
require("dotenv").config()

const app = express()

app.use(express.json());

const PORT = process.env.PORT || 3000;


//* starting route home route
app.get("/", (req,res)=>{
     return res.send("Welcome to finance management system backend")
})

//* 404 route handler

app.all("*", (req,res)=>{

     res.status(404).send({message:"The Route you are searching for doesnot exists", result:false})
})

//*  Error Handler

app.use((err, req,res, next)=>{
    console.error(err);
    res.status(500).send({
        result:false,
        message:"Internal Server Error"
    })
})




app.listen(PORT, ()=>{

    console.log(`Server is running on port ${PORT}`)
})
