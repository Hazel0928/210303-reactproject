//包含n个接口请求函数的模块，每个函数返回promise
import ajax from './ajax'
import json from 'jsonp'
import { message } from 'antd'
const BASE = '' //已解决完跨域问题，所以BASE不变。

//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')



//jsonp请求的接口请求函数
//查询天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=eb8c149d2c2df63aa401e535067ec3f7&city=${city}`
        json(url, {}, (err, data) => {
            if (!err && data.status === '1')
                {const { weather } = data.lives[0]
                resolve({weather})}
            else {
                message.error('获取天气信息失败')
            }
        })
    })

}