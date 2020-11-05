const express = require('express');
const { isAuth, isAdmin } = require('../controller/auth');
const { verifyAccessToken } = require('../helpers/jwtHelper');
const router = express.Router()
const { create, listTask,getStatusValues,updateTaskStatus,taskById,listTaskByUser } = require("../controller/task");
const { userById } = require('../controller/user');




router.post("/task/create/:userId", verifyAccessToken, isAuth,create)
router.get("/task/list/:userId", verifyAccessToken, isAuth,isAdmin,listTask);
router.get("/task/usertask/:userId", verifyAccessToken, isAuth,listTaskByUser);

router.get(
    "/task/status-values/:userId",
    verifyAccessToken,
    isAuth,
    
    getStatusValues
);
router.put(
    "/task/:taskId/status/:userId",
    verifyAccessToken,
    isAuth,

    updateTaskStatus
);


router.param("userId", userById)
router.param("taskId", taskById);

module.exports = router