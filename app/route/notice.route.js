module.exports = app => {

    
    const notice= require("../controllers/notice.controller.js");
    var router = require("express").Router();
    router.post("/",notice.create);
    router.get("/",notice.findAll);
    router.get("/getone",notice.findOne);
    router.post("/update",notice.update);
    // router.post("/getimg",turtorial.editUserImg);
    
    app.use('/api/notice',router);

}