module.exports = app => {

    const multer=require('multer');
    const upload = multer()

    const user= require("../controllers/user.controller.js");
    var router = require("express").Router();
    router.post("/",user.create);
    router.get("/",user.findAll);
    router.get("/getone",user.findOne);
    router.post("/update",user.update);
    router.post("/delete",user.destroy);
    router.post("/login",user.login);
    router.post("/uploadpic", upload.single('avatar'),user.editUserImg)
    // router.post("/getimg",turtorial.editUserImg);
    
    app.use('/api/user',router);

    


}