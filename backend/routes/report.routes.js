const {Router} = require("express");
const { getMonthlyReport } = require("../controller/report.controller");
const reportRouter = Router();



reportRouter.get("/get_report/:month/:year", getMonthlyReport);


module.exports = reportRouter;