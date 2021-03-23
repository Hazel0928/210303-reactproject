import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions/userStore'

const { SubMenu } = Menu;

//左侧导航组件
class LeftNav extends Component {
    constructor(props){
        super(props)
        this.menuNodes = this.getMenuNodes_reduce(menuList)
    }
    //判断当前登录用户对item是否有权限
    hasAuth = (item) => {
        const key = item.key
        // const menus = this.props.userStore.role.menus
        const {username} = this.props.userStore.loginUser
        //1.如果当前用户是admin，
        //2.如果当前item是公开的，返回true
        //3.当前用户有此item的权限：key中有没有menus中
        if (username === 'admin' || item.isPublic 
        // || menus.indexOf(key) !== -1
        ) {
            return true
        } 
        // else if (item.children) {//如果当前用户有此item的某个子item的权限
        //     return !!(item.children.find(child => menus.indexOf(child.key) !== -1)) //强制转换为bool值
        // }
        // return false
    }
    //根据menu的数据数组生成对应的标签数组
    // getMenuNodes_map = (menuList) => {
    //     //使用map加递归调用
    //     return menuList.map((item) => {
    //         if (!item.children) {
    //             return (<Menu.Item key={item.key} icon={item.icon}>
    //                 <Link to={item.key}>{item.title}</Link>
    //             </Menu.Item>)
    //         } else {
    //             return (<SubMenu key={item.key} icon={item.icon} title={item.title}>
    //                 {this.getMenuNodes_map(item.children)}
    //             </SubMenu>)
    //         }
    //     })
    // }
    getMenuNodes_reduce = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            //如果当前用户有item对应的权限，才需要显示对应的菜单项
            if (this.hasAuth(item)) {

                //如果item没有children
                // 向pre添加<Menu.Item>
                if(!item.children) {
                  // 判断item是否是当前对应的item
                  if (item.key===path || path.indexOf(item.key)===0) {
                    // 更新redux中的headerTitle状态
                    this.props.setHeadTitle(item.title)
                  }
                
                pre.push(<Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.key} onClick={() => this.props.setHeadTitle(item.title)}>{item.title}</Link>
                </Menu.Item>)
                //向pre中添加<SubMenu>
            } else {
                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                //如果存在，说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }

                pre.push((
                <SubMenu key={item.key} title={item.title} icon={item.icon}>
                    {this.getMenuNodes_reduce(item.children)}
                </SubMenu>))
            }
        
            //向pre中添加<Menu.Item>
            }
            return pre
    }, [])
}
render() {
    // debugger
    //得到请求的路径
    let path = this.props.location.pathname
    if (path.indexOf('/product') === 0) { //当前请求的是商品或其子路由界面
        path = '/product'
    }
    //得到需要打开菜单项的key
    const openKey = this.openKey
    return (
        <div className="left-nav">
            <Link to="/" className="left-nav-header">
                <img src={logo} alt="logo" />
                {!this.props.collapsed && <h1>后台管理系统</h1>}
            </Link>

            <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"

            >
                {
                    this.menuNodes
                }

            </Menu>
        </div>
    )
}
}
export default connect(
    state => ({userStore:state.userStore}),
    { setHeadTitle }
)(withRouter(LeftNav))