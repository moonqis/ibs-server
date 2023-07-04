const db = require("../models");
const Notice = db.notice;
let fs = require ('fs')
let path = require('path')
const log = require("../log/log");

exports.create=(req,res)=>{
    if(!req.body.title){
        res.status(400).send({
            message: "性名不能为空"
        });
        return;
    }
    const notice ={
        title:req.body.title,
        state:req.body.state,
        Date:req.body.Date,
        author:req.body.author,
        createDate: req.body.create_date,
        createBy: req.body.create_by,
        updateDate: req.body.update_date,
        updateBy: req.body.update_by,
    };
    Notice.create(notice).then(data=>{
        log.createnotice('create_notice--' + JSON.stringify(data))

        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "创建出错"
        });
        
    });
};


 exports.findAll=(req,res)=>{
    Notice.findAll().then((data)=>{
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
    Notice.findByPk(id).then((data)=>{
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
    Notice.update(req.body,{
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


