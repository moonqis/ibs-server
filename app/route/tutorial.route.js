module.exports = app => {
    const multer=require('multer');
    const upload = multer({ dest: "img/tutorial/" })
    
    const turtorial= require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    router.post("/",turtorial.create);
    router.get("/",turtorial.findAll);
    router.get("/getone",turtorial.findOne);
    router.post("/update",turtorial.update);
    router.post("/destroy",turtorial.destroy);
    router.post("/uploadpic", upload.single('avatar'),turtorial.editUserImg)

    // router.post("/getimg",turtorial.editUserImg);
    
    app.use('/api/tutorial',router);

}