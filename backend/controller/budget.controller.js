const {prisma} = require("../config/db.js");


const createBudget = async(req,res)=>{

    const {category, amount, startDate, endDate} = req.body;
    const userId = req.body.userId;

   try {
    const newBudget = await prisma.budget.create({
        data:{category,amount, startDate:new Date(startDate), endDate: new Date(endDate), userId}
    });
    res.status(201).send(newBudget);
   } catch (error) {
    res.status(500).send("Internal Server Error");
   }
}


const getAllBudget = async(req,res)=>{

    const userId = req.body.userId;

   try {
    const allBudget = await prisma.budget.findMany({
        where:{userId}
    })
    res.status(201).send(allBudget);
   } catch (error) {
    res.status(500).send("Internal Server Error");
   }
}

module.exports={createBudget, getAllBudget}