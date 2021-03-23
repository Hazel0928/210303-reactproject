import React, { Component } from 'react'
import {
    Form,
    Input,
    Row,
    Col,
    message,
} from 'antd'
import { withRouter } from 'react-router-dom'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import PromptBox from '../prompt-box'
import { randomNum } from '../../utils/utils'
import { connect } from 'react-redux'
import { verifylogin } from '../../redux/actions/userStore'
import './index.less'
import { login } from '../../utils/session';

const Item = Form.Item

class LoginForm extends Component {
    form = React.createRef()
    canvas = React.createRef()
    state = {
        focusItem: -1, //保存当前聚焦的input
        code: '', //验证码
        usernameError: undefined,
        passwordError: undefined,
        verificationError: undefined
    }


    //生成验证码
    createCode = () => {
        let ctx = this.canvas.current.getContext('2d');
        let chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let code = '';
        ctx.clearRect(0, 0, 80, 39);
        for (let i = 0; i < 4; i++) {
            let char = chars[randomNum(0, 57)];
            code += char;
            ctx.font = `${randomNum(20, 25)}px SimHei`; // 设置字体随机大小
            ctx.fillStyle = '#D3D7F7';
            ctx.textBaseline = 'middle';
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            let x = 80 / 5 * (i + 1);
            let y = 39 / 2;
            let deg = randomNum(-25, 25);
            /** 设置旋转角度和坐标原点* */
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(char, 0, 0);
            /** 恢复旋转角度和坐标原点* */
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        this.setState({
            code
        });
    }

    onFinish = async (values) => {
        const { username, password, verification } = values
        const getFieldError = this.form.current ? this.form.current.getFieldError : []
        if (verification.toUpperCase() !== this.state.code.toUpperCase()) {
            this.form.current.setFields([
                {
                    name: ['verification'],
                    value: values.verification,
                    errors: ['验证码错误'],
                },
            ])
            this.setState({
                usernameError: this.form.current ? getFieldError('username') : null,
                passwordError: this.form.current ? getFieldError('password') : null,
                verificationError: this.form.current ? getFieldError('verification') : null
            })
        }
        let { verifylogin, userStore } = this.props
        try {
            const result1 = await login({username,password});
            console.log(result1)
            
        } catch (e) {
            if (e === '用户名错误') {
                this.form.current.setFields([
                    {
                        name: ['username'],
                        value: values.username,
                        errors: ['用户名错误'],
                    },
                ])
            }
            if (e === '密码错误') {
                this.form.current.setFields([
                    {
                        name: ['password'],
                        value: values.password,
                        errors: ['密码错误'],
                    },
                ])
            }
            this.setState({
                usernameError: this.form.current ? getFieldError('username') : null,
                passwordError: this.form.current ? getFieldError('password') : null,
                verificationError: this.form.current ? getFieldError('verification') : null
            })
            return;
        }
        const result2 = verifylogin({ username, password })
        message.success('登录成功')
        // console.log(userStore,'..........')
        this.props.history.replace({pathname:'/'})

    }

    register = (values) => {
        this.props.switchShowBox('register')
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
                name: ['confirmpassword'],
                value: values.confirmpassword,
                errors: null,
            },
        ])
        this.setState({
            usernameError: undefined,
            passwordError: undefined,
            verificationError: undefined,
        })
    setTimeout(() => this.form.current.resetFields(), 500)
    }


onChange = () => {
    const getFieldError = this.form.current ? this.form.current.getFieldError : []
    this.setState({
        usernameError: this.form.current ? getFieldError('username') : null,
        passwordError: this.form.current ? getFieldError('password') : null,
        verificationError: this.form.current ? getFieldError('verification') : null
    })
}

componentDidMount() {

    this.createCode()
    const getFieldError = this.form.current ? this.form.current.getFieldError : []
    this.setState({
        usernameError: this.form.current ? getFieldError('username') : null,
        passwordError: this.form.current ? getFieldError('password') : null,
        verificationError: this.form.current ? getFieldError('verification') : null
    })
}
render() {
    const { className } = this.props
    const { usernameError, passwordError, verificationError } = this.state

    return (
        <div className={`${className} loginFormWrap`}>
            <h3 className="title">管理员登录</h3>
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
                <Row>
                    <Col span={15}>
                        <Item name="verification"
                            validateFirst='true'
                            help={
                                verificationError && verificationError.length !== 0 && <PromptBox info={verificationError} width={verificationError} style={{ marginLeft: '99px' }} />
                            }
                            rules={[{
                                required: true,
                                message: '请输入验证码'
                            }]}>
                            <Input onFocus={() => this.setState({ focusItem: 2 })}
                                onBlur={() => this.setState({ focusItem: -1 })}
                                maxLength={4}
                                prefix={<SafetyOutlined className={this.state.focusItem === 2 ? `iconfont icon-User focus` : `iconfont icon-User`} style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="验证码"></Input>
                        </Item>
                    </Col>
                    <Col span={9}>
                        <canvas style={{ position: 'relative', zIndex: '100' }} width="80" height="39"
                            ref={this.canvas} onClick={this.createCode}
                        ></canvas>
                    </Col>
                </Row>
                <div className="bottom">
                    <input type='submit' value="登录" className="loginBtn" />
                    <span className="registerBtn" onClick={this.register}>注册</span>
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
    { verifylogin }
)(LoginForm))
