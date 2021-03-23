import { notification } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../../components/login-form'
import RegisterForm from '../../components/register-form'
import './index.less'
import { withRouter } from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        showBox: 'login'//默认登录表单
    }
    initPage = () => {
        notification.open({
            message: (
                <ul>
                    <li>初始账号：admin</li>
                    <li>初始密码：123456</li>
                </ul>
            ),
            duration: 0,
            className: 'loginNotification'
        });
    }

    switchShowBox = (box) => {
        this.setState({
            showBox: box
        })
    }

    componentDidMount() {
        console.log(this.props.userStore.isLogin,'@@@@@@@@@@@@@')
        if(this.props.userStore.isLogin){
            this.props.history.push({pathname:'/'})//已经登陆过
            // return <Redirect to="/"></Redirect>
        }
        this.initPage()
    }

    componentWillUnmount() {
        notification.destroy()
    }
    render() {
        console.log(this.props)
        const { showBox } = this.state
        return (
            <div className="login">
                <div className="backgroundBox"></div>
                <div className="container">
                    {/* 登录表单 */}
                    <LoginForm
                        className={showBox === 'login' ? 'box showbox' : 'box hiddenbox'}
                        switchShowBox={this.switchShowBox}></LoginForm>
                    {/* 注册表单 */}
                    <RegisterForm
                        className={showBox === 'register' ? 'box showBox' : 'box hiddenbox'}
                        switchShowBox={this.switchShowBox}></RegisterForm>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ userStore:state.userStore}),
    {}
)(withRouter(Login))