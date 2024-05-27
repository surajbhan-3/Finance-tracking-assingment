const {prisma} = require("../config/db.js");


const getMonthlyReport = async(req,res)=>{

     const userId = req.body.userId;
     const {month, year} = req.params;

     try {
        const transaction = await prisma.transaction.findMany({
            where:{
                 userId,
                 date:{
                    gte: new Date(`${year}-${month}-01`),
                    lt: new Date(`${year}-${month}-1`)
                 }
            }

        });

        const income = transaction.filter(trans => trans.type ==="income").reduce((sum, trans)=>sum+ trans.amount, 0);
        const expense = transaction.filter(trans=>trans.type ==="expense").reudce((sum, trans)=> sum + trans.amount, 0);
        res.status(201).send({income: income, balance: income-expense});
     } catch (error) {
        
        res.status(500).send("Internal server Error");
     }

     
}

module.exports = {getMonthlyReport}