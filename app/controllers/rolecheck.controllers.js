const db = require("../models");
const  Rolecheck= db.rolecheck;
let fs = require ('fs')
let path = require('path')

exports.create=(req,res)=>{
    console.log(req.body)
    console.log('query:'+req.query)
    if(!req.body.name){
        res.status(400).send({
            message: "名称不能为空"
        });
        return;
    }
    const rolecheck ={
            name:req.body.name,
            telephone:req.body.telephone,
            state:req.body.state,
            result:req.body.result,
            createDate: req.body.create_date,
            createBy: req.body.create_by,
            updateDate: req.body.update_date,
            updateBy: req.body.update_by,
        };
        Rolecheck.create(rolecheck).then(data=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "创建出错"
        });
        
    });
};


//修改头像


 exports.findAll=(req,res)=>{
    Rolecheck.findAll().then((data)=>{
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
    Rolecheck.findByPk(id).then((data)=>{
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
    Rolecheck.update(req.body,{
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


