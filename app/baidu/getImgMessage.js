const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: "https://aip.baidubce.com/api",
    headers: {
        "Content-type": "application/json;charset=utf-8"
    },
    timeout: 10000,
})
const access_token = "";//token
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


