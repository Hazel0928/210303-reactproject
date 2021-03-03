import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()
    }
     onFinish = async (values) => {
        const {username,password} = values
        // 使用async和await作用：简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数
        // 以同步编码（没有回调函数了）方式实现异步流程
        // 在返回promise的表达式左侧写await：不想要promise，想要promise异步执行成功的value的数据
        // 在await所在的最近的函数定义的左侧写async
        const result = await reqLogin(username,password)
        console.log("请求成功",result)
        // const response = await reqLogin(username,password)
        // reqLogin(username,password).then(response =>{
        //     console.log("成功了",response.data)
        // }).catch(error => {
        //     console.log("失败了",error)
        // })
        if(result.status === 0){//登录成功
            message.success('登录成功')

            //保存user
            const user = result.data
            memoryUtils.user = user//保存在内存中
            storageUtils.saveUser(user)//保存在local中
            //跳转到后台管理界面(不需要再回退到登录，因此用replace方法)
            this.props.history.replace('/')
        } else {
            message.error(result.message)
        }
        console.log('Received values of form: ', values);
    };
    onFinishFailed=()=>{
        console.log("校验失败")
    }
    handleSubmit = (e)=>{
        e.preventDefault()
    }
    render() {
        //如果用户已经登录，自动跳转到管理页面
        const user = memoryUtils.user
        
        if(user && user._id){
            return <Redirect to="/"></Redirect>
        }
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目</h1>
                </header>
                <section className="login-section">
                    <h2>用户登录</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            //声明式验证：直接使用别人定义好的验证规则进行验证
                            rules={[
                                {
                                    required: true,
                                    whitespace:true,
                                    message: '用户名必须输入',
                                },
                                {
                                    min:4,
                                    message:'用户名至少为4位',
                                },
                                {
                                    max:12,
                                    message:"用户名最多12位",
                                },
                                {
                                    pattern:/^[a-zA-Z0-9_]+$/,

                                    message:'用户名必须是英文、数字下划线组成'
                                }
                            ]}
                            
                            
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25' }} />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            //自定义验证
                            rules={[
                                (value) => ({
                                  validator(rule, value,callback) {
                                    if(!value){
                                        return Promise.reject("密码不能为空")
                                    }else if(value.length<4){
                                        return Promise.reject("密码长度不能小于4")
                                    }else if(value.length>12){
                                        return Promise.reject("密码长度不能大于12")
                                    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                        return Promise.reject("密码必须是英文、数字下划线组成")
                                    } else {
                                        return Promise.resolve()//验证通过
                                    }
                                    
                                  },
                                }),
                              ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                                style={{ color: 'rgba(0,0,0,.25' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
