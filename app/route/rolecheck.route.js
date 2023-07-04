module.exports = app => {

    
    const rolecheck= require("../controllers/rolecheck.controllers");
    var router = require("express").Router();
    router.post("/",rolecheck.create);
    router.get("/",rolecheck.findAll);
    router.get("/getone",rolecheck.findOne);
    router.post("/update",rolecheck.update);

    app.use('/api/rolecheck',router);

}