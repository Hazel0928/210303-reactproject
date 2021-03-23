import React, { Component } from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    message,
} from 'antd'
import { withRouter } from 'react-router-dom'
import users from '../../utils/users'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import PromptBox from '../prompt-box'
import { connect } from 'react-redux'
import {register} from '../../redux/actions/userStore'
import './index.less'

const Item = Form.Item

class RegisterForm extends Component {
    form = React.createRef()
    canvas = React.createRef()
    state = {
        focusItem: -1, //保存当前聚焦的input
        usernameError: undefined,
        passwordError: undefined,
        confirmPasswordError: undefined
    }

    onFinish = async (values) => {
        this.setState({
            focusItem: -1
        })
        const { username, password } = values
        const getFieldError = this.form.current ? this.form.current.getFieldError : []
        const {register,userStore} = this.props
        try {
            users = await register({ username, password })
        } catch (e) {
            if (e === '用户名已存在') {
                this.form.current.setFields([
                    {
                        name: ['username'],
                        value: values.username,
                        errors: ['用户名已存在'],
                    },
                ])
            this.setState({
                usernameError: this.form.current ? getFieldError('username') : null,
            })
            return;
        }
        }
       console.log(userStore)
        message.success('注册成功')
    }

    onChange = () => {
        const getFieldError = this.form.current ? this.form.current.getFieldError : []
        this.setState({
            usernameError: this.form.current ? getFieldError('username') : null,
            passwordError: this.form.current ? getFieldError('password') : null,
            confirmPasswordError: this.form.current ? getFieldError('confirmpassword') : null
        })
    }

    gobackLogin = (values) => {
        this.form.current.setFields([
            {
                name: ['username'],
                value: values.username,
                errors: null,
            },
            {
                name: ['password'],
                value: values.password,
                errors: null,
            },
            {
                name: ['confirmPassword'],
                value: values.confirmPassword,
                errors: null,
            },
        ])
        setTimeout(()=>{
            this.setState({
                usernameError: undefined,
                passwordError: undefined,
                confirmPasswordError: undefined
            })
        },500)
        this.props.switchShowBox('login')
        setTimeout(() => this.form.current.resetFields(), 500)
    }

    componentDidMount() {
        const getFieldError = this.form.current ? this.form.current.getFieldError : []
        this.setState({
            usernameError: this.form.current ? getFieldError('username') : null,
            passwordError: this.form.current ? getFieldError('password') : null,
            confirmPasswordError: this.form.current ? getFieldError('confirmpassword') : null
        })
    }
    render() {
        const { className } = this.props
        const { usernameError, passwordError, confirmPasswordError } = this.state
        const confirmValidator = (rule,value,callback) => {
            if(value!==this.form.current.getFieldValue('password'))
            return Promise.reject('两次输入不一致')
            else{
                return Promise.resolve()
            }
        }

        return (
            <div className={`${className} RegisterFormWrap`}>
                <h3 className="title">管理员注册</h3>
                <Form ref={this.form}
                    onFinish={this.onFinish}
                    onFieldsChange={this.onChange}
                    name="login">
                    <Item name="username"
                        help={
                            usernameError && usernameError.length !== 0 && <PromptBox info={usernameError} width={usernameError} />
                        }
                        rules={[{
                            required: true,
                            message: '请输入用户名'
                        }]}
                    >
                        <Input onFocus={() => this.setState({ focusItem: 0 })}
                            onBlur={() => this.setState({ focusItem: -1 })}
                            prefix={<UserOutlined className={this.state.focusItem === 0 ? `iconfont icon-User focus` : `iconfont icon-User`} style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名" maxLength={16}></Input>
                    </Item>
                    <Item name="password"
                        help={
                            passwordError && passwordError.length !== 0 && <PromptBox info={passwordError} width={passwordError} />
                        }
                        rules={[{
                            required: true,
                            message: '请输入密码'
                        }]}>
                        <Input onFocus={() => this.setState({ focusItem: 1 })}
                            onBlur={() => this.setState({ focusItem: -1 })}
                            type='password'
                            maxLength={16}
                            prefix={<LockOutlined className={this.state.focusItem === 1 ? `iconfont icon-User focus` : `iconfont icon-User`} style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="密码" ></Input>
                    </Item>
                    <Item name="confirmpassword"
                        help={
                            confirmPasswordError && confirmPasswordError.length !== 0 && <PromptBox info={confirmPasswordError} width={confirmPasswordError} />
                        }
                        rules={[
                            {
                                required:true,
                                message:'确认密码不能为空'
                            },
                            {
                                validator:confirmValidator,
                            }
                          ]}
                        // rules={[{
                        //     required: true,
                        //     message: '请确认密码'
                        // }]}
                        >
                        <Input onFocus={() => this.setState({ focusItem: 2 })}
                            onBlur={() => this.setState({ focusItem: -1 })}
                            type='password'
                            maxLength={16}
                            prefix={<LockOutlined className={this.state.focusItem === 1 ? `iconfont icon-User focus` : `iconfont icon-User`} style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="确认密码" ></Input>
                    </Item>
                    <div className="bottom">
                        <input type='submit' value="注册" className="loginBtn" />
                        <span className="registerBtn" onClick={this.gobackLogin}>返回登录</span>
                    </div>
                </Form>
                <div className="footer">
                    <div>欢迎登陆</div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(
    state => ({ userStore: state.userStore }),
    { register }
)(RegisterForm))
