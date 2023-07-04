const db = require("../models");
const Sortcheck = db.sortcheck;

exports.create = (req, res) => {
    console.log(req.body)
    console.log('query:' + req.query)
    if (!req.body.name) {
        res.status(400).send({
            message: "名称不能为空"
        });
        return;
    }
    const sortcheck = {
        name: req.body.name,
        english_name: req.body.english_name,
        state: req.body.state,
        index:req.body.index,
        // result:req.body.result,
        createDate: req.body.create_date,
        createBy: req.body.create_by,
        updateDate: req.body.update_date,
        updateBy: req.body.update_by,

    };
    Sortcheck.create(sortcheck).then(data => {
        res.send(data);
    }).catch((err) => {
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

    Sortcheck.findAndCountAll({
        where: whereInfo,
    }).then(resData => {
        res.send(resData)
    }).catch(() => {
        res.send({
            msg: '查询失败'
        })
    })
}

exports.findAll = (req, res) => {
    Sortcheck.findAll().then((data) => {
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
    Sortcheck.findByPk(id).then((data) => {
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


exports.update=(req,res)=>{
    let id=req.body.id
    console.log(id)
    Sortcheck.update(req.body,{
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


