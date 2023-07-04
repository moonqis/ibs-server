const db = require("../models");
const Tutorial = db.tutorial;
let fs = require('fs');
let path = require('path')
const log = require("../log/log");
exports.create=(req,res)=>{
    console.log(req.body,req.query)
    if(!req.query.name){
        res.status(400).send({
            message: "姓名不能为空"
        });
        return;
    }
    const turtorial ={
        name:req.query.name,
        // description: req.body.description,
        // published: req.body.published,
    };
    Tutorial.create(turtorial).then(data=>{
        log.create('create_tutorial--'+JSON.stringify(data))
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
                err.message || "创建出错"
        });
        
    });
};


 exports.findAll=(req,res)=>{
    Tutorial.findAll().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.status(500).send({
            message:
              err.message || "查询列表出错"
        });
    })
}
//修改封面
exports.editUserImg = (req, res) => {

    // console.log(1)
    const file = req.file

    console.log(path.parse(req.file.originalname).ext);
    let oldname = req.file.path //获取path
    let newname = req.file.path + path.parse(req.file.originalname).ext  
    fs.renameSync(oldname, newname) //重命名
    console.log('文件类型：%s', file.mimetype)
    console.log('原始文件名：%s', file.originalname)
    console.log('文件大小：%s', file.size)
    console.log('文件保存路径：%s', file.path)
    
    
    Tutorial.update(
    {
            pic:'http://192.168.43.114:3000/'+file.filename+path.parse(req.file.originalname).ext  //修改数据库
        },
        {
            where:{
            id:req.body.id
        }
    }).then((data)=>{
        res.send(data);

    })
    
    
}
exports.findOne=(req,res)=>{
    let id=req.query.id
    Tutorial.findByPk(id).then((data)=>{
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
    Tutorial.update(req.body,{
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

exports.destroy=(req,res)=>{
    let id=req.body.id
    console.log(id)
    Tutorial.destroy({
        where:{
            id: id
        }
    })
    // .then((data)=>{
    //     if(data){
    //         res.send(data);
    //     }else{
    //         res.status(404).send({
    //             message:"ID不存在",
    //         });
    //     }
    // }).catch((err)=>{
    //     res.status(500).send({
    //         message:
    //           err.message || "更新失败"
    //     });
    
    // })
}

// exports.editUserImg = (req,res)=>{
//     if(req.file.length === 0){
//         res.render('error',{message:'上传文件不能为空！'});
//     }else{
//         let file = req.file;
//         console.log(file);
//         fs.renameSync('./public/uploads/'+file.filename,'./public/uploads/'+file.originalname);
//         res.set({
//             'content-type':'application/JSON; charset=utf-8'
//         })
//         let id=req.query.id
//         let imgUrl = 'http://localhost:3000/public/uploads/'+file.originalname;
//         let sql =`update tutorials set published=? where id=?`;
//         let sqlArr = [imgUrl,id];
//         dbConfig.sqlConnect(sql,sqlArr,(err,data)=>{
//             if(err){
//                 console.log(err);
//                 throw '出错了';
//             }else{
//                 if(data.affectedRows == 1){
//                     res.send({
//                         code:200,
//                         msg:'修改成功',
//                         url:imgUrl
//                     })
//                 }else{
//                     res.send({
//                         code:400,
//                         msg:'修改失败'
//                     })
//                 }
//             }
//         })
//     }
    
// }

