const db = require("../models");
const Foodfeed = db.foodfeed;
let fs = require('fs')
let path = require('path')

exports.create = (req, res) => {
    console.log(req.body)
    console.log('query:' + req.query)
    if (!req.body.name) {
        res.status(400).send({
            message: "名称不能为空"
        });
        return;
    }
    const feed = {
        name: req.body.name,
        english_name:req.body.english_name,
        food_id:req.body.food_id,
        state:req.body.state,
        author_id:req.body.author_id,
        author:req.body.author,
        createDate: req.body.create_date,
        createBy: req.body.create_by,
        updateDate: req.body.update_date,
        updateBy: req.body.update_by,
    };
    Foodfeed.create(feed).then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "创建出错"
        });

    });
};



exports.findAll = (req, res) => {
    Foodfeed.findAll().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "查询列表出错"
        });
    })
}



exports.findOne = (req, res) => {
    let id = req.query.id
    Foodfeed.findByPk(id).then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "ID不存在",
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "查询列表出错"
        });

    })
}




