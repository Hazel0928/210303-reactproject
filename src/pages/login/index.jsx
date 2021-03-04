import React, { Component } from 'react'
import LoginForm from '../../components/login-form'
import RegisterForm from '../../components/register-form'
import './index.less'

export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="backgroundBox"></div>
                <div className="container">
                    <LoginForm></LoginForm>
                    <RegisterForm></RegisterForm>
                </div>
            </div>
        )
    }
}
