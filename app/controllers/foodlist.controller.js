const db = require("../models");
const Foodlist = db.foodlist;
let fs = require('fs')
let path = require('path');
const log = require("../log/log");

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "性名不能为空"
        });
        return;
    }
    const foodlist = {
        name: req.body.name,
        english_name: req.body.english_name,
        sort: req.body.sort,
        picurl: req.body.picurl,
        detail: req.body.detail,
        detail_weight1: req.body.detail_weight1,
        detail_weight2: req.body.detail_weight2,
        detail_weight3: req.body.detail_weight3,
        detail_resource1: req.body.detail_resource1,
        detail_resource2: req.body.detail_resource2,
        detail_resource3: req.body.detail_resource3,
        detail_detail1: req.body.detail_detail1,
        detail_detail2: req.body.detail_detail2,
        detail_detail3: req.body.detail_detail3,
        state: req.body.state,
        createDate: req.body.createDate,
        createBy: req.body.createBy,
        updateDate: req.body.updateDate,
        updateBy: req.body.updateBy,
    };
    Foodlist.create(foodlist).then(data => {
        log.create('create_foodlist--' + JSON.stringify(data))
        
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "创建出错"
        });

    });
};


exports.findAll = (req, res) => {
    Foodlist.findAll().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "查询列表出错"
        });
    })
}

var COS = require('cos-nodejs-sdk-v5')

const cos = new COS({
  SecretId: 'AKIDc1C9qGQM5ZLF4nU2MQM4bxAEE0XrDWwD', // 身份识别ID
  SecretKey: 'CXgXCfwy2woaGuOhq0wcO0aCjHgqkNp4' // 身份秘钥
})
//修改图片
exports.editUserImg = (req, res) => {
    const file = req.file
    console.log(req.file)
    const fileFormat = file.originalname.split('.')
    
    file.filename=Date.now() + '.' + fileFormat[fileFormat.length - 1]
    console.log(file.filename)
    cos.putObject({
      Bucket: 'mingxlab-1258665547', /* 存储桶 */
      Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
      Key: 'ibs-food/food-image/'+file.filename, /* 文件名 */
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
        Foodlist.update(
            {
                picurl: `https:${data.Location}`  //修改数据库
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

exports.findOnesort = (req, res) => {
    let whereInfo = {};
    let x = 'all'
    if (req.query.sort == 0 || req.query.sort == x) {
        whereInfo = {
        }
    } else {
        whereInfo = {
            sort: req.query.sort
        }

    }
    Foodlist.findAndCountAll({
        where: whereInfo,
    }).then(resData => {
        res.send(resData)
    }).catch(() => {
        res.send({
            msg: '查询失败'
        })
    })
}
exports.findOne = (req, res) => {
    let id = req.query.id
    Foodlist.findByPk(id).then((data) => {
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
    console.log(req.body)
    Foodlist.update(req.body, {
        where: {
            id: id
        }
    }).then((data) => {
        // console.log(data[0])
        if (data[0] != 0) {
            log.create('update_foodlist--' + JSON.stringify(req.body))
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


