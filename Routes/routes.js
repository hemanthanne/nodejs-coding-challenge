const express = require("express");
const router = express.Router();
const controller = require("../Controllers/Controller");
router.post("/AddUser", controller.AddUser);
router.put("/UpdateUser", controller.UpdateUser);
router.delete("/DeleteUser", controller.DeleteUser);
router.get("/GetUsers", controller.GetUsers);

module.exports = router;
