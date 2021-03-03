import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'

const Option = Select.Option

//添加分类的form组件
export default class AddForm extends Component {
    componentWillMount () {
        this.props.setForm(this.props.form)
      }
    
    
    render() {
        const {categorys,parentId,setForm} = this.props
        console.log(parentId)
        return (
            <Form>
                <Form.Item initialValue={parentId}
                name="label">
                    <Select style={{width:'100%'}}>
                    <Option value="0">一级分类</Option>
                    {
                        categorys.map(c => <Option value={c._id}>{c.name}</Option>)
                    }
                    </Select>
                </Form.Item>
                <Form.Item initialValue=''
                name="labelname"
                rules={[{ required: true, message:'分类名称必须填入' }]}>
                    <Input placeholder="请输入分类名称"></Input>
                </Form.Item>
                
            </Form>
        )
    }
}

