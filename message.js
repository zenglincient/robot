const express = require('express')

const app = express()
const axios = require('axios')

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/sms', (req, res) => {

    console.log('post 请求')
    console.log(req.body)
    res.send('ok')
    // axios.post(url, data).then(response => {
    //     res.send(response.data)
    // })
})


app.get('/api/sms', (req, res) => {
    console.log('get 请求')
    console.log(req.query)
    res.send('Hello World')
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d3c49d63-41cd-478a-830f-9e43e8836f03', {
        msgtype: 'text',
        text: {
            content: '喂，三点几了，饮茶时间到了',
            mentioned_list: ["@all"],
        }
    }, { 
        headers: {
            'Content-Type': 'application/json'
        },

    }).then((res) => {
        console.log(res.data)
    })
})

app.listen(9000, () => {
    console.log('server is running at http://localhost:9000')
})
