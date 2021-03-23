import {getCookie,setCookie} from './cookie'
import users from './users'

const LOGIN_COOKIE_NAME = 'sessionId';

export function isAuthenticated() {
	return getCookie(LOGIN_COOKIE_NAME);
}

export function authenticateSuccess(token) {
	setCookie(LOGIN_COOKIE_NAME, token);
}

export function logout() {
	setCookie('username', '', -1);
}

export const login = async (loginInfo)  => {
    let { username, password} = loginInfo
    return new Promise( (resolve, reject) => {

        // 发起异步请求  获取信息
        /*
            ...
            axios(url, {userName, password})
         */
           
        // 暂时假数据代替 
        let user = users.find(v => v.username === username)
        if (!user) return reject('用户名错误')
        if (user.password !== password) return reject('密码错误')
        resolve(user)
        setCookie('username', user.username)
    })
}