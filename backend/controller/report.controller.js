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
        console.log(transaction)
        const startDate = new Date(`${year}-${month.toString().padStart(2, '0')}-01T00:00:00.000Z`);

        // Calculate the next month
        let nextMonth = month + 1;
        let nextMonthYear = year;
        if (nextMonth > 12) {
            nextMonth = 1;
            nextMonthYear = (parseInt(year) + 1).toString();
        }
        const endDate = new Date(`${nextMonthYear}-${nextMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);
        
        const budget = await prisma.budget.findMany({
            where: {
                userId: userId,
                startDate: {
                    gte: startDate
                },
                endDate: {
                    lt: endDate
                }
            }
        });
        const income = budget.filter(trans => trans.type ==="income").reduce((sum, trans)=>sum+ trans.amount, 0);
        const expense = transaction.filter(trans=>trans.type ==="expense").reduce((sum, trans)=> sum + trans.amount, 0);
        console.log(budget, "budget is here") 
        console.log(income, expense)
        res.status(201).send({income: income, balance: income-expense});
     } catch (error) {
        
        res.status(500).send({message:"Internal Server Errror",Error:error.message});
     }

     
}

module.exports = {getMonthlyReport}