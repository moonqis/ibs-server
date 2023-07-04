const db = require("../models");
const Feed = db.feed;
let fs = require('fs')
let path = require('path')
var COS = require('cos-nodejs-sdk-v5')

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
        telephone: req.body.telephone,
        state: req.body.state,
        title: req.body.title,
        type: req.body.type,
        createDate: req.body.create_date,
        createBy: req.body.create_by,
        updateDate: req.body.update_date,
        updateBy: req.body.update_by,
    };
    Feed.create(feed).then(data => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "创建出错"
        });

    });
};


//修改头像
const cos = new COS({
    SecretId: 'AKIDc1C9qGQM5ZLF4nU2MQM4bxAEE0XrDWwD', // 身份识别ID
    SecretKey: 'CXgXCfwy2woaGuOhq0wcO0aCjHgqkNp4' // 身份秘钥
  })
exports.editUserImg = (req, res) => {
    const file = req.file
  console.log(req.file)
  const fileFormat = file.originalname.split('.')
  
  file.filename=Date.now() + '.' + fileFormat[fileFormat.length - 1]
  console.log(file.filename)
  cos.putObject({
    Bucket: 'mingxlab-1258665547', /* 存储桶 */
    Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
    Key: 'ibs-food/other/'+file.filename, /* 文件名 */
    // StorageClass: 'STANDARD', // 上传模式, 标准模式
    Body: file.buffer, // 上传文件对象
    onProgress: (progressData) => { // 上传进度
      console.log(JSON.stringify(progressData))
    }
  }, (err, data) => {
    console.log(err || data)
    // 上传成功之后
    if(data)
    if (data.statusCode === 200) {
      console.log(`https:${data.Location}`)
      Feed.update(
        {
            pic: `https:${data.Location}`//修改数据库
        },
        {
            where: {
                id: req.body.id
            }
        }).then(data => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "创建出错"
            });

        });
    }
  })
    


}

exports.findAll = (req, res) => {
    Feed.findAll().then((data) => {
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
    Feed.findByPk(id).then((data) => {
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


exports.update = (req, res) => {
    let id = req.body.id
    console.log(id)
    Feed.update(req.body, {
        where: {
            id: id
        }
    }).then((data) => {
        console.log(data[0])
        if (data[0] != 0) {
            res.send({
                message: "更新成功",

            });
        } else {
            res.status(404).send({
                message: "更新失败",
            });
        }
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "更新失败"
        });

    })
}


