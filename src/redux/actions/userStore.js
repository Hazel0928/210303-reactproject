import { LOGOUT,VERIFYLOGIN,SET_HEAD_TITLE } from '../types/const'
import {setCookie} from '../../utils/cookie'
import users from '../../utils/users'

//设置头部标题的同步action
export const setHeadTitle =(headTitle)=>({
    type:SET_HEAD_TITLE,
    data:headTitle
})

//注销
export const verifylogout = () => ({
    type: LOGOUT
})

// 注册
export const register = (loginInfo) => async dispatch=> {
    let {username,password} = loginInfo
    return new Promise ((resolve,reject) => {
        let result = users.find((item) => item.username === loginInfo.username)
        if(result) {
            return reject('用户名已存在')}
        users.push({
            username:username,
            password:password,
            roles:['guest'],
            Auth_Token:'guest'
        })
        resolve(users)
    })
}

export const verifylogin=({username,password})=>({
    type:VERIFYLOGIN,
    username,
    password
})

// export const verifylogin = (loginInfo) => async dispatch => {
//     let { username, password} = loginInfo
//     return new Promise( (resolve, reject) => {

//         // 发起异步请求  获取信息
//         /*
//             ...
//             axios(url, {userName, password})
//          */
           
//         // 暂时假数据代替 
//         let user = users.find(v => v.username === username)
//         if (!user) return reject('用户名错误')
//         if (user.password !== password) return reject('密码错误')
//         resolve(user)
//         setCookie('username', user.username)
//     })
// }