module.exports = app => {
    const multer=require('multer');
    const upload = multer()
    
    // 导入用户逻辑
    const uploadController= require("../COSupload/getImgName");
    var router = require("express").Router();
    
    // 设置路由
    router.post('/imguploadCOS',upload.single('avatar'),uploadController.create)
    
    app.use('/api',router);
    
    }
    