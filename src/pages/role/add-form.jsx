import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'

const Option = Select.Option

//添加分类的form组件
export default class AddForm extends Component {
    componentWillMount () {
        // this.props.setForm(this.props.form)
      }
    
    
    render() {
        const {addrole} = this.props
        
        const formItemLayout = {
            labelCol: { span: 2 },//左侧label的宽度
            wrapperCol: { span: 15 },//右侧包裹的宽度
        }

        return (
            <Form ref={addrole}>
                <Form.Item initialValue='' {...formItemLayout}
                name="roleName"
                label="角色名称"
                rules={[{ required: true, message:'角色名称必须填入' }]}>
                    <Input placeholder="请输入角色名称"></Input>
                </Form.Item>
                
            </Form>
        )
    }
}

