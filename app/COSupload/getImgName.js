var COS = require('cos-nodejs-sdk-v5')

const cos = new COS({
  SecretId: '', // 身份识别ID
  SecretKey: '' // 身份秘钥
})
exports.create = (req, res) => {
  const file = req.file
  console.log(req.file)
  const fileFormat = file.originalname.split('.')
  
  file.filename=Date.now() + '.' + fileFormat[fileFormat.length - 1]
  console.log(file.filename)
  cos.putObject({
    Bucket: 'mingxlab-11111', /* 存储桶 */
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
      res.send({
        meta: { code: 200, msg: '上传成功！' },
        data: { img_url: `https:${data.Location}`}
      })
    }
  })
};


