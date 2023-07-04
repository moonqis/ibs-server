module.exports = app => {

const express = require('express')

// 导入用户逻辑
const uploadController= require("../uploads/UploadController");
var router = require("express").Router();

// 设置路由
router.post('/foodpic', uploadController.upload)

app.use('/api/upload',router);

}