
// 导入fs模块
const fs = require('fs')



exports.create = (req, res) => {
    // console.log(req)
    // fs.writeFile("./app/log/log_foodlist.txt", req, function (err) {
    //     // 如果err为true，则文件写入失败，并返回失败信息
    //     if (err) {
    //         return console.log('文件写入失败！' + err.message)
    //     }
    //     // 若文件写入成功，将显示“文件写入成功”
    //     console.log('文件写入成功！')
    // })
    const originFilePath ='./log_txt/log_foodlist.txt'
    const targetFilePath ='./log_txt/log_foodlist.txt'

    fs.readFile(originFilePath, (err, res) => {
		if (err) {
			return console.log(err)
		}
		fs.writeFile(targetFilePath, res, function(err, res) {
			if (err) {
				return console.log(err)
			}
			console.log('copy over')
			fs.appendFile(targetFilePath, `\r\n${new Date().toLocaleString()}--${req}`, (err, res) => {
				if (err) {
					return console.log('append txt failed')
				}
				console.log('append file success')
			})
		})

	})


}

exports.createuser = (req, res) => {
    const originFilePath ='./log_txt/log_user.txt'
    const targetFilePath ='./log_txt/log_user.txt'

    fs.readFile(originFilePath, (err, res) => {
		if (err) {
			return console.log(err)
		}
		fs.writeFile(targetFilePath, res, function(err, res) {
			if (err) {
				return console.log(err)
			}
			console.log('copy over')
			fs.appendFile(targetFilePath, `\r\n${new Date().toLocaleString()}--${req}`, (err, res) => {
				if (err) {
					return console.log('append txt failed')
				}
				console.log('append file success')
			})
		})

	})


}

exports.createnotice = (req, res) => {
    const originFilePath ='./log_txt/log_notice.txt'
    const targetFilePath ='./log_txt/log_notice.txt'

    fs.readFile(originFilePath, (err, res) => {
		if (err) {
			return console.log(err)
		}
		fs.writeFile(targetFilePath, res, function(err, res) {
			if (err) {
				return console.log(err)
			}
			console.log('copy over')
			fs.appendFile(targetFilePath, `\r\n${new Date().toLocaleString()}--${req}`, (err, res) => {
				if (err) {
					return console.log('append txt failed')
				}
				console.log('append file success')
			})
		})

	})


}
