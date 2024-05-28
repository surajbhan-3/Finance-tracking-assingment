const {prisma} = require("../config/db.js");


const getMonthlyReport = async(req,res)=>{

     const userId = req.body.userId;
     const {month, year} = req.params;

    

     try {
        const transaction = await prisma.transaction.findMany({
            where:{
                 userId,
                 date:{
                  gte: new Date(`${parseInt(year)}-${parseInt(month)}-01`),
                  lt: new Date(`${parseInt(year)}-${parseInt(month) + 1}-01`)
                 }
            }

        });
        console.log("hello")
        console.log(transaction);
        const income = transaction.filter(trans => trans.type ==="income").reduce((sum, trans)=>sum+ trans.amount, 0);
        const expense = transaction.filter(trans=>trans.type ==="expense").reduce((sum, trans)=> sum + trans.amount, 0);
          
        res.status(201).send({income: income, balance: income-expense});
     } catch (error) {
        
        res.status(500).send({message:"Internal Server Errror",Error:error.message});
     }

     
}

module.exports = {getMonthlyReport}