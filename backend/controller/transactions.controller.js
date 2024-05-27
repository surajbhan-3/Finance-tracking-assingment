
const {prisma} = require("../config/db.js")

const newTransaction =  async(req,res)=>{
      const {amount, description, categoryId} = req.body;
       const date = Date();
      const userId = req.body.userId;
      try {
        const transaction = await prisma.transaction.create({
            data:{
                amount,
                date:new Date(date),
                description,
                categoryId,
                userId
            }
        })
        return  res.status(201).send({transaction:transaction})        
      } catch (error) {
        res.status(500).send({message:"Internal Server Error", result:false, Error:error.message})
      }

 }

 const getTransactions = async(req,res)=>{
   const userId = req.body.userId;
   try {
     const getData = await prisma.transaction.findMany({where:{userId}})
     return res.status(200).send(getData)
   } catch (error) {
    res.status(500).send({message:"Internal Server Error", result:false, Error:error.message})

   }

 }

 module.exports = {newTransaction, getTransactions}
