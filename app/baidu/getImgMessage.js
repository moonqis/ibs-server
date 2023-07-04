const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: "https://aip.baidubce.com/api",
    headers: {
        "Content-type": "application/json;charset=utf-8"
    },
    timeout: 10000,
})
const access_token =
    "24.aeb2c8a9f3c78f379c480e8b4a1f1a15.2592000.1684508574.282335-32601217";
exports.create = (req, res) => {
    console.log(req.body)
    let x = '{"image":"' + req.body.image + '","scenes":["advanced_general","dishs","ingredient"]}'
    console.log(x)
    axiosInstance.post('/v1/solution/direct/imagerecognition/combination?access_token=' + access_token, x)
        .then(data => {
            if (data) {
                console.log(data.data)
                res.send(data.data.result)
            }
            else
                console.log('err')
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
};


