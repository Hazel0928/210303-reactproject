//进行local数据存储管理的工具模块.localStorage有些低端浏览器不兼容，因此可以用store库
import store from 'store'
const USER_KEY = 'user_key'
export default {
    //保存user
    // saveUser (user){
    //     localStorage.setItem(USER_KEY,JSON.stringify(user))//user此时是对象，setItem函数接收字符串，一个对象的tostring方法传不了具体的值，因此要用JSON的方法。
    // },
    saveUser(user) {
        store.set(USER_KEY, user)
    },

    //读取user
    // getUser() {
    //     return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    // }
    getUser() {
        return store.get(USER_KEY) || {}
    },
    //删除user
    // removeUser() {
    //     localStorage.removeItem(USER_KEY)
    // }
    removeUser() {
        store.remove(USER_KEY)
    }
}