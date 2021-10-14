const moment = require('moment')

const axios = require('axios')

// 获取是否是节假日
const getIsWordDay = () => {
    let today = moment().utcOffset(480).format('YYYYMMDD')
    return new Promise((resolve, reject) => {
        axios.get(`https://api.apihubs.cn/holiday/get?date=${today}`).then((res) => {
            if (res.data.code == 0) {
                let todayInfo = res.data.data.list[0]
                let isWorkday = todayInfo.workday == 1
                resolve(isWorkday)
            }
        }).catch(e => {
            // 如果查询失败就不提醒
            let isWorkday = false
            resolve(isWorkday)
        })
    })
}


console.log(moment().utcOffset(480).format('HH:mm'))

setInterval(() => {
    const lunchTime = '13:14'
    const dinnerTime = '18:19'
    const time = moment().utcOffset(480).format('HH:mm')
    if ([lunchTime, dinnerT.includes(time)) {
        getIsWordDay().then(isWorkday => {
            if (isWorkday) {
                console.log('吃饭了')
                sendMsg()
            }
        })
    }
}, 60 * 1000)



const sendMsg = () => {
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=b2638742-7b3e-4f36-a68e-69c4fe2a2e65', {
        msgtype: 'text',
        text: {
            content: '吃饭时间到了',
            mentioned_list: ["@all"],
        }
    }, { 
        headers: {
            'Content-Type': 'application/json'
        },

    }).then((res) => {
        console.log(res.data)
    })
}

