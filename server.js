const express = require('express')
const cors=require('cors')
// const router = require('./app/route/router')
const bodyParser = require('body-parser')

const app =new express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// var corsOptions1 = {
//     origin:"http://localhost:8080"
// }

app.use(cors())


const db = require("./app/models")
db.sequelize.sync();
require("./app/route/tutorial.route")(app)
require("./app/route/user.route")(app)
require("./app/route/food.route")(app)
require("./app/route/foodlist.route")(app)
require("./app/route/role.route")(app)
require("./app/route/notice.route")(app)
require("./app/route/foodcheck.route")(app)
require('./app/uploads/UploadRoute')(app)
require("./app/route/foodsortcheck.route")(app)
require("./app/route/feedback.route")(app)
require("./app/route/rolecheck.route")(app)
require("./app/route/foodfeed.route")(app)
require("./app/baidu/imgMessage.route")(app)
require("./app/COSupload/imgupload.route")(app)

// const path = require('path');
// app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('./img/foodlist'));
app.use(express.static('./img/feed'));
app.use(express.static('./public'));
app.use(express.static('./img/user'));



app.get('/',(req,res)=>{
    res.json({'message':"IBS系统"})
})


const PORT=3000;    
app.listen(PORT,()=>{
    console.log('端口:' + PORT)
})



