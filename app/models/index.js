const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
)

const db = {};
db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.tutorial=require('./turtorial.model.js')(sequelize,Sequelize)
db.user=require('./user.model.js')(sequelize,Sequelize)
db.food=require('./food.model.js')(sequelize,Sequelize)
db.foodlist=require('./foodlist.model.js')(sequelize,Sequelize)
db.role=require('./role.model.js')(sequelize,Sequelize)
db.notice=require('./notice.model.js')(sequelize,Sequelize)
db.foodcheck=require('./foodcheck.model.js')(sequelize,Sequelize)
db.sortcheck=require('./foodsortcheck.model.js')(sequelize,Sequelize)
db.feed=require('./feedback.model.js')(sequelize,Sequelize)
db.rolecheck=require('./rolecheck.model.js')(sequelize,Sequelize)
db.foodfeed=require('./foodfeed.model.js')(sequelize,Sequelize)

module.exports=db
