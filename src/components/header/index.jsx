import React, { Component } from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { withRouter } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        weather: "",
    }
    getTime = () => {
        this.intervalid = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async () => {
        //调用接口请求函数获取数据
        const { weather } = await reqWeather('310000')
        this.setState({ weather })
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path)
                title = item.title
            else if (item.children) {
                //在所有的子item中查找匹配的
                const cItem = item.children.find(citem =>
                    path.indexOf(citem.key)===0
                )
                //如果有值才说明有匹配的
                if (cItem) title = cItem.title
            }
        })
        return title
    }

    logout = () => {
        //显示确认框
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确定退出吗',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                console.log('memoryUtils:',memoryUtils)
                storageUtils.removeUser()
                memoryUtils.user={}
                console.log('storageUtils:',storageUtils)
                console.log('memoryUtils:',memoryUtils)
                this.props.history.replace('/login')
                console.log(this.props.history)
            },
        })
    }

    //第一次render之后执行一次，一般在此执行异步操作：发ajax请求、启动定时器
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    //当前组件卸载之前调用
    componentWillUnmount(){
        clearInterval(this.intervalid)
    }
    render() {
        const { currentTime, weather } = this.state
        const username = memoryUtils.user.username
        //得到当前需要显示的title
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src="" alt="" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
