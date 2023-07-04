module.exports = app => {
    const multer=require('multer');
    const upload = multer()
    
    const foodlist= require("../controllers/foodlist.controller.js");
    var router = require("express").Router();
    router.post("/",foodlist.create);
    router.get("/",foodlist.findAll);
    router.get("/getone",foodlist.findOne);
    router.get("/getonesort",foodlist.findOnesort);

    router.post("/update",foodlist.update);
    router.post("/uploadpic", upload.single('avatar'),foodlist.editUserImg)

    // router.post("/getimg",turtorial.editUserImg);
    app.use('/api/foodlist',router);

}