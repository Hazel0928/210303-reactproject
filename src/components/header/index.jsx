import React, { Component } from 'react'
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from '../link-button'
import { logout } from '../../utils/session'
import { verifylogout } from '../../redux/actions/userStore'

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
                    path.indexOf(citem.key) === 0
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
            onOk: () => {
                logout()
                console.log('onok:', this.props.userStore.loginUser.username)
                this.props.verifylogout()
                this.props.history.replace({ pathname: '/login' })
            },
        })
    }
    toggle=()=>{
        this.props.onToggle()
    }

    //第一次render之后执行一次，一般在此执行异步操作：发ajax请求、启动定时器
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    //当前组件卸载之前调用
    componentWillUnmount() {
        clearInterval(this.intervalid)
    }
    render() {
        const { currentTime, weather } = this.state
        const username = this.props.userStore.loginUser.username
        //得到当前需要显示的title
        // const title = this.getTitle()
        const title = this.props.headTitle //react-redux传递过来的

        let { collapsed } = this.props
        return (
            <div className="header">
                <div className="header-top">
                    <div className="left" onClick={this.toggle}>{
                        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
                    <div>
                        <span>欢迎,{username}</span>
                        <LinkButton onClick={this.logout}>退出</LinkButton>
                    </div>

                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span> &nbsp;
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        headTitle: state.headTitle,
        userStore: state.userStore
    }),
    { verifylogout }
)(withRouter(Header))
