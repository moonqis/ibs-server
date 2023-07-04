module.exports = app => {
    const multer=require('multer');
    const upload = multer()

    
    const feed= require("../controllers/feedback.controller.js");
    var router = require("express").Router();
    router.post("/",feed.create);
    router.get("/",feed.findAll);
    router.get("/getone",feed.findOne);
    router.post("/update",feed.update);
    router.post("/uploadpic", upload.single('avatar'),feed.editUserImg)

    app.use('/api/feed',router);

}