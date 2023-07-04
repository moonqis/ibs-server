const db = require("../models");
const User = db.user;
let fs = require('fs')
let path = require('path')
const log = require("../log/log");
var COS = require('cos-nodejs-sdk-v5')
const key1 = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3ImKIpKIMyJn6
il+RJh4c6uE+UFefBjVRT2g82w9qtXSWGvJ9tVEE8DbKJTIEnvrvycg6Wf3PQknB
oGCADbdSr5aOPB6go4G7nC4ojpscTeBZ0gO/50CUebGoWf+yAIywWc2ZSnDiWIO2
hsKPucF3sNdGVX2mDgNbZc7QRuXo/DKuu9U30ZEkD+QjnGaRNhM/9sFS5JvODD77
cDVlNFQRUtHkCQQEst7gnMNadup+2atppfUQJtsld9dEVslrxDOeAe2LOUjmgEUX
ehQBLtvCvB1ushCTPA1TqCj8bxEHzMESmGd9VAWBgPP7bMohoJxjD36ENX6HWwdN
7ugikrp3AgMBAAECggEBAKn7MnYeSYOQFsvj7/xr4vt4UAVk0U97lbWY/Omvcsnb
DxHchUOFLmRlCpXqnFiJr+Ut57mxmdHsd0VPtQJmuMf4zsfKqar02Q/oUTe31eUZ
q6nzMyPGY7zsj6fxkVIJDI0LbbhgzhJpkiezQZfiFN8ht09DPtMIorkM8D+F7xSm
nkQ9wqjLyVtkqwyoMTuGe+fNSXI8vEy+oUdspLqWcD0mn9gwvv3koVeOHTxAv64Z
CNoeY7+ps2rRRHilBwYu1mMmRX9zi/KqxEP2seFdD2L70NZxMdQgeHBxmMdVgO6q
0b/dX5qAm8wWeXrkUUWTOicWj+uXAoKNURhJpj2KDRECgYEA7Wougb5lkhU0K/Mw
+MJ0VJc1ayaiMYQJkbPMnVP/Ee7g0YPD03maIc0AVTQ6kQtXhCE8ghA14cO65Y33
V03msVF+w9nm/tl2KgFAdHMlY2U/pwOeRvrxOJKA0bxY7st1gvLd8LeqqyunYBdm
Zx+4Q54LeAYHV+V/BtLc0v7Q+gMCgYEAxXhquGycBcLncT71dUh1PM98GjRY6Us8
Q+RAq2dxU4aNYshzwV7Igwy6czTUqXNFDRn4fI+nXSL+4HMfuQpwjMCyS3ZhxT1i
FW+d78A0x8dIE5god3c0R6IHH8u/M++LyaGUXw3G0bWVJEbh3XlKcmXRTQafaq0j
hZIHX8JHjX0CgYB/1393iejzwss3J1sleMBflJTFQCZyd2EXvjPePA7Lv0/8QfG+
/GoM7XDScK9gzzSvB56ngscg7N7FIa8gqeghb3rNR5blgH/qmoX0rtRhM3IVIxOl
sRcXmXwYdE2HOLPscY8lQiF6zqTwT2lq+l+kuYP/e2+U2xWNvRn/3Ar3tQKBgQCy
U/yMcAi2azz3WBPyxmyZbgZ047EnfXn/FbIRGGmPNIOaIcvnZOFO97+pKpyiKibB
niJ42oIZ6fCiYVTUlkjt01cwLsg8hyJ8mT/Xs4v2nlDI4TAqMsxTpE8qt6UEEd/7
Rp/m91oFKCZ3jEuM5mwEw04wcTql65WYmjduktRrQQKBgQC2vqKV8Cj7L/scEyAv
pcp+49cuuM888EnaFWYMmJSc/e5vGVhpB2Jb5xR8ISILrc9Uq+59I1Av+fYbhWHJ
psTn2Dhm/vcgnanqedwJFDzt6krzp/nVM29xli2YicWfviAnGY6MjQm+Hqk/JagJ
/oO3db9TJ2j6afNVrwd2CCr2Pw==
-----END PRIVATE KEY-----
`
const NodeRSA = require("node-rsa")
const privateKey = new NodeRSA(key1) // 使用node-rsa
privateKey.setOptions({ encryptionScheme: "pkcs1" }) // 因为vue中使用jsencrypt，jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1
privateKey.setOptions({ encryptionScheme: 'pkcs1' });//指定加密格式  不改格式得话可能会报错


exports.login=(req,res)=>{
    var password = privateKey.decrypt(req.body.password, "utf8")
    User.findAll({
        where: {
            name: req.body.name
        }
    }).then((data) => {
        if (data) {
            console.log(data[0].password);
            if(password==data[0].password){
                data[0].password=req.body.password
                res.send(data)
            }else{
                res.send("密码错误");  
            }
        } else {
            res.send("账号不存在");
        }
    }).catch((err) => {
        res.send("账号不存在或登录错误");

    })
    console.log(password)
}

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "性名不能为空"
        });
        return;
    }
    const user = {
        name: req.body.name,
        password: req.body.password,
        make_name: req.body.name,
        english_name: req.body.name,
        role: req.body.role,
        food_collect: req.body.food_collect,
        picurl: req.body.picurl,
        sex: req.body.sex,
        address: req.body.address,
        tel: req.body.tel,
        state: req.body.state,
        createDate: req.body.create_date,
        createBy: req.body.create_by,
        updateDate: req.body.update_date,
        updateBy: req.body.update_by,
    };
    User.create(user).then(data => {
        log.createuser('create_user--' + JSON.stringify(data))

        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "创建出错"
        });

    });
};


exports.findAll = (req, res) => {
    User.findAll().then((data) => {
        data.forEach(function(item,index,self){
        item.password='password'
    })
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "查询列表出错"
        });
    })
}

// 填写自己腾讯云cos中的key和id (密钥)

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
    Key: 'ibs-food/avatar/'+file.filename, /* 文件名 */
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
      User.update(
        {
            picurl: `https:${data.Location}`//修改数据库
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

exports.findOne = (req, res) => {
    console.log(req.query.name)
    let name = req.query.name
    User.findAll({
        where: {
            name: name
        }
    }).then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "账号不存在",
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
    User.update(req.body, {
        where: {
            id: id
        }
    }).then((data) => {
        console.log(data[0])
        if (data[0] != 0) {
            log.createuser('update_user--' + JSON.stringify(req.body))
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




exports.destroy = (req, res) => {
    let id = req.body.id
    console.log(id)
    User.destroy({
        where: {
            id: id
        }
    })

}