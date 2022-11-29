const express = require("express")
const router = express.Router()
const { isAuth, setCount } = require("../middlewares/isAuth")
const userController = require("../controllers/userController")
const campaignController = require("../controllers/campaignController")

router.post("/api/user", userController.createUser)
router.post("/api/login", userController.userLogin)
router.get("/api/logout", userController.logout)
router.get("/api/admin", isAuth, userController.adminDashboard)

router.post("/api/campaign", campaignController.createCampaign)
router.post("/api/redirect", campaignController.redirectCampaign, )
router.get("/api/admin/campaigns/:id/toggle", isAuth, campaignController.toggleCampaign)


module.exports = router;
