module.exports = app => {

    
    const sortcheck= require("../controllers/foodsortcheck.controller.js");
    var router = require("express").Router();
    router.post("/",sortcheck.create);
    router.get("/",sortcheck.findAll);
    router.get("/getone",sortcheck.findOne);
    router.post("/update",sortcheck.update);
    // router.post("/getimg",turtorial.editUserImg);
    router.get("/getoneuser",sortcheck.findOnesort);

    app.use('/api/sortcheck',router);

}