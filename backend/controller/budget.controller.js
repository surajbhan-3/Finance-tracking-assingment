const {prisma} = require("../config/db.js");
 
const { convertCurrency }= require("../utils/currencyConverter.js")


const createBudget = async(req,res)=>{

    const { amount, startDate, endDate, fromCurrency, toCurrency} = req.body;
    const userId = req.body.userId;
    const typeincome ="income"
   console.log(startDate, endDate, userId)
   try {
    const convertedCurrency = await convertCurrency(amount, fromCurrency, toCurrency);

    const newBudget = await prisma.budget.create({
        data:{amount:convertedCurrency, startDate:new Date(startDate), endDate: new Date(endDate), userId, type:typeincome}
    });
    res.status(201).send(newBudget);
   } catch (error) {
    res.status(500).send({message:"Internal Server Error", Error:error.message, result:false});
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

// Update a budget
const updateBudget = async (req, res) => {
    const { id } = req.params;
    const { amount, startDate, endDate } = req.body;
    const userId = req.body.userId;
  
    try {
      const updateBudget = await prisma.budget.updateMany({
        where: { id: parseInt(id), userId },
        data: {
          amount,
          startDate: new Date(startDate), 
          endDate: new Date(endDate),    
        },
      });
  
      if (updateBudget.count === 0) {
        return res.status(404).json({ error: 'Budget not found' });
      }
  
      res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a budget
const deleteBudget =  async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
  
    try {
      const budget = await prisma.budget.deleteMany({
        where: { id: parseInt(id), userId },
      });
  
      if (budget.count === 0) {
        return res.status(404).json({ error: 'Budget not found' });
      }
  
      res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports={createBudget, getAllBudget,updateBudget, deleteBudget}