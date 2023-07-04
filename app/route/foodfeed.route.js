module.exports = app => {
    
    const feed= require("../controllers/foodfeed.controller");
    var router = require("express").Router();
    router.post("/",feed.create);
    router.get("/",feed.findAll);
    router.get("/getone",feed.findOne);

    app.use('/api/foodfeed',router);

}