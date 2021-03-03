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

//获取分类列表
export const reqCategorys = (parentId)=> ajax(BASE + '/manage/category/list', {parentId})

//添加分类
export const reqAddCategorys = (categoryName,parentId)=> ajax(BASE + '/manage/category/add', {categoryName,parentId},'POST')

//更新分类名称
export const reqUpdateCategorys = ({categoryId,categoryName})=> ajax(BASE + '/manage/category/update', {categoryId,categoryName},'POST')

//获取一个分类
export const reqCategory = (categoryId)=> ajax(BASE + '/manage/category/info', {categoryId})

//获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

//搜索商品分页列表(根据商品名称)
//searchType:搜索类型 productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(BASE + '/manage/product/search', 
{pageNum, pageSize,[searchType]:searchName})

// //搜索商品分页列表(根据商品描述)
// export const reqSearchProducts = ({pageNum,pageSize,searchName,saearchType}) => ajax(BASE + '/manage/product/search', 
// {pageNum, pageSize,productDesc:searchName})

//删除指定名称的图片
export const reqDeleteImg = (name) => ajax(BASE+'/manage/img/delete',{name},'POST')

//添加商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE+'/manage/product/'+(product._id?'update':'add'),product,'POST')

// //修改商品
// export const reqUpdateProduct = (product) => ajax(BASE+'/manage/product/update',product,'POST')

//获取所有角色的列表
export const reqRoles = () => ajax(BASE+'/manage/role/list')

//添加角色的列表
export const reqAddRole = (roleName) => ajax(BASE+'/manage/role/add',{roleName},'POST')

//更新角色的列表
export const reqUpdateRole = (role) => ajax(BASE+'/manage/role/update',role,'POST')

//获取所有用户的列表
export const reqUsers = () => ajax(BASE+'/manage/user/list')

//删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE+'/manage/user/delete',{userId},'POST')

//添加用户
export const reqAddOrUpdateUser = (user) => ajax(BASE+'/manage/user/'+(user._id?'update':'add'),user,'POST')