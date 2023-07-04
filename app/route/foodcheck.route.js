module.exports = app => {
    
    const foodcheck= require("../controllers/foodcheck.controller.js");
    var router = require("express").Router();
    router.post("/",foodcheck.create);
    router.get("/",foodcheck.findAll);
    router.get("/getone",foodcheck.findOne);
    // router.get("/getonesort",foodcheck.findOnesort);
    router.get("/getoneuser",foodcheck.findOnesort);

    router.post("/update",foodcheck.update);
    // router.post("/uploadpic", upload.single('avatar'),foodcheck.editUserImg)

    
    app.use('/api/foodcheck',router);   

}