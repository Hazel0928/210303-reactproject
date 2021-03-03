import React, { PureComponent } from 'react'
import { Form, Select, Input } from 'antd'

const Option = Select.Option

//添加、修改用户的form组件
export default class UserForm extends PureComponent {
    state = {
        selectvalue: 'B',
    }
    render() {
        const { roles, addform } = this.props
        const user = this.props.user || {}
        const { selectvalue } = this.state
        const formItemLayout = {
            labelCol: { span: 2 },//左侧label的宽度
            wrapperCol: { span: 15 },//右侧包裹的宽度
        }
        console.log(user)

        return (
            <Form ref={addform} {...formItemLayout}>
                <Form.Item initialValue={user.username}
                    name="username"
                    label="角色名称">
                    <Input placeholder="请输入用户名称"></Input>
                </Form.Item>
                {
                    user._id?null:(
                        <Form.Item initialValue={user.password}
                    name="password"
                    label="密码">
                    <Input type='password' placeholder="请输入密码"></Input>
                </Form.Item>
                    )
                }
                
                <Form.Item initialValue={user.phone}
                    name="phone"
                    label="手机号">
                    <Input placeholder="请输入手机号"></Input>
                </Form.Item>
                <Form.Item initialValue={user.email}
                    name="email"
                    label="邮箱">
                    <Input placeholder="请输入邮箱"></Input>
                </Form.Item>
                <Form.Item
                    initialValue={user.role_id}
                    name="role_id"
                    label="角色">
                    <Select placeholder="请选择角色" >
                        {
                            roles.map((role) => <Option key={role._id} value={role._id}>{role.name}</Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}

