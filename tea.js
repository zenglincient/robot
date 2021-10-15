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
    const teaTime = '15:00'
    const time = moment().utcOffset(480).format('HH:mm')
    if ([teaTime].includes(time)) {
        getIsWordDay().then(isWorkday => {
            if (isWorkday) {
                console.log('饮茶')
                sendMsg()
            }
        })
    }
}, 60 * 1000)


const sendMsg = () => {
    axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=205fb0d3-f2bf-41af-a9f1-b039f872cfb3', {
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
}

