const {Router} = require("express");
const { createBudget, getAllBudget } = require("../controller/budget.controller");
const budgetRouter = Router()



budgetRouter.post("/add_budget", createBudget);
budgetRouter.get("/all_budget", getAllBudget)


module.exports = budgetRouter;



