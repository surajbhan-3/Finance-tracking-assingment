const {Router} = require("express")
const { createNewCategory, getAllCategories } = require("../controller/categories.controller")
const categoryRouter = Router()


categoryRouter.post("/new_category", createNewCategory)
categoryRouter.get("/all_categories", getAllCategories)

module.exports = categoryRouter;