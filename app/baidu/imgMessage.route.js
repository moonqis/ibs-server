module.exports = app => {

    
    // 导入用户逻辑
    const uploadController= require("../baidu/getImgMessage");
    var router = require("express").Router();
    
    // 设置路由
    router.post('/imgmessage',uploadController.create)
    
    app.use('/api',router);
    
    }
    