const axios = require('axios')

axios.post('http://127.0.0.1:9000/api/sms', {
    name:1222
}).then(res => {
    console.log(res.data)
})


    