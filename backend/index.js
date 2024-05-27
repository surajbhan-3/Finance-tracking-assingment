const express = require("express")
const cors = require("cors")
require("dotenv").config()
const userRouter = require("./routes/user.routes.js");
const { AuthenticationMiddleware } = require("./middleware/Authentication.middleware.js");
const transactionRouter = require("./routes/transactions.route.js");
const categoryRouter = require("./routes/category.routes.js");
const budgetRouter = require("./routes/budget.routes.js");
const reportRouter = require("./routes/report.routes.js");

const app = express()

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 3000;


//* starting route home route
app.get("/", (req,res)=>{
     return res.send("Welcome to finance management system backend")
})



app.use("/api/user", userRouter);
app.use("/api/transactions",AuthenticationMiddleware, transactionRouter);
app.use("/api/category", AuthenticationMiddleware, categoryRouter);
app.use("/api/budget", AuthenticationMiddleware, budgetRouter);
app.use("/api/report",AuthenticationMiddleware, reportRouter);


// * 404 route handler

app.all("*", (req,res)=>{

     res.status(404).send({message:"The Route you are searching for doesnot exists", result:false})
})

app.listen(PORT, ()=>{

    console.log(`Server is running on port ${PORT}`)
})
