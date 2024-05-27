const {prisma} = require("../config/db.js")


const createNewCategory = async(req,res)=>{

 const {name} = req.body;
 try {
    const category = await prisma.category.create({
        data:{name}
    })
    return res.status(201).send(category)
 } catch (error) {
    return res.status(500).send({message:"Internal Server Error"})
 }

}
const getAllCategories = async(req,res)=>{
   
      try {
        const categories = await prisma.category.findMany()
        res.status(200).send(categories)
      } catch (error) {
        res.status(500).send("Internal server error")
      }     
}

module.exports = {createNewCategory, getAllCategories}