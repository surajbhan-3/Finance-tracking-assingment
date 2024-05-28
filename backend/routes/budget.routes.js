const {Router} = require("express");
const { createBudget, getAllBudget, updateBudget, deleteBudget } = require("../controller/budget.controller");
const budgetRouter = Router()



budgetRouter.post("/add_budget", createBudget);
budgetRouter.get("/all_budget", getAllBudget)
budgetRouter.put("/:id", updateBudget);
budgetRouter.delete("/:id", deleteBudget)


module.exports = budgetRouter;



