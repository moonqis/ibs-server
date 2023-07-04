module.exports = app => {

    
    const role= require("../controllers/role.controller.js");
    var router = require("express").Router();
    router.post("/",role.create);
    router.get("/",role.findAll);
    router.get("/getone",role.findOne);
    router.post("/update",role.update);
    // router.post("/getimg",turtorial.editUserImg);
    
    app.use('/api/role',router);

}