module.exports = app => {

    
    const food= require("../controllers/food.controller.js");
    var router = require("express").Router();
    router.post("/",food.create);
    router.get("/",food.findAll);
    router.get("/getone",food.findOne);
    router.post("/update",food.update);
    // router.post("/getimg",turtorial.editUserImg);
    
    app.use('/api/food',router);

}