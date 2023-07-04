const db = require("../models");
const Foodcheck = db.foodcheck;
let fs = require ('fs')
let path = require('path')

exports.create=(req,res)=>{
    console.log(req.body)
    console.log('body:'+req.query)
    if(!req.body.name){
        res.status(400).send({
            message: "性名不能为空"
        });
        return;
    }
    const foodcheck ={
            name:req.body.name,
            english_name:req.body.english_name,
            sort:req.body.sort,
            picurl:req.body.imgurl,
            detail:req.body.detail1,
            detail_weight1:req.body.detail_weight1,
            detail_weight2:req.body.detail_weight2,
            detail_weight3:req.body.detail_weight3,
            detail_resource1:req.body.detail_resource1,
            detail_resource2:req.body.detail_resource2,
            detail_resource3:req.body.detail_resource3,
            detail_detail1:req.body.detail_detail1,
            detail_detail2:req.body.detail_detail2,
            detail_detail3:req.body.detail_detail3,
            state:req.body.state,
            author:req.body.author,
            admin:req.body.admin,
            result:req.body.result,
        //     createDate: req.body.create_date,
        createBy: req.body.create_by,
        // updateDate: req.body.update_date,
        updateBy: req.body.update_by,
    
        };
    Foodcheck.create(foodcheck).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "创建出错"
        });
        
    });
};

exports.findOnesort = (req, res) => {
    let whereInfo = {};
    // let x = 'all'
    // console.log(x)


    whereInfo = {
        create_by: req.query.create_by
    }

    Foodcheck.findAndCountAll({
        where: whereInfo,
    }).then(resData => {
        res.send(resData)
    }).catch(() => {
        res.send({
            msg: '查询失败'
        })
    })
}
 exports.findAll=(req,res)=>{
    Foodcheck.findAll().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
              err.message || "查询列表出错"
        });
    })
}



exports.findOne=(req,res)=>{
    let id=req.query.id
    Foodcheck.findByPk(id).then((data)=>{
    if(data){
        res.send(data);
    }else{
        res.status(404).send({
            message:"ID不存在",
        });
    }
    }).catch((err)=>{
        res.status(500).send({
            message:
              err.message || "查询列表出错"
        });
    
    })
}


exports.update=(req,res)=>{
    let id=req.body.id
    console.log(id)
    Foodcheck.update(req.body,{
        where:{
            id: id
        }
    }).then((data)=>{
        console.log(data[0])
    if(data[0]!=0){
        res.send({
            message:"更新成功",

        });
    }else{
        res.status(404).send({
            message:"更新失败",
        });
    }
    }).catch((err)=>{
        res.status(500).send({
            message:
              err.message || "更新失败"
        });
    
    })
}
