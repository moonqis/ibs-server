const uploadAvatar = require('../multer/upload')

// 用户的逻辑控制器
class UploadController {

  // 头像图片上传
  async upload(req, res) {
    try {
      const uploadRes = await uploadAvatar(req, res)

      res.send({
        meta: { code: 200, msg: '上传成功！' },
        data: { img_url: uploadRes}
      })
    } catch (error) {
      res.send(error)
    }
  }

}

module.exports = new UploadController()