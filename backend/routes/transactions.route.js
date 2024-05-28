const {Router} = require("express")
const { newTransaction, getTransactions } = require("../controller/transactions.controller")
const transactionRouter = Router()


transactionRouter.post("/new_transaction",newTransaction);
transactionRouter.get("/get_transaction", getTransactions);


module.exports = transactionRouter;
