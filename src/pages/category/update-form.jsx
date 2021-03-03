import React, { Component } from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item

//更新分类的form组件
export default class UpdateForm extends Component {
    static propTypes = {
        categoryName:PropTypes.string.isRequired
    }
  
    
    render() {
        const {categoryName,formRef} = this.props
        return (
            <Form ref={formRef}>
                <Item initialValue={categoryName}
                name='categoryName'
                rules={[{ required: true,message:'分类名称必须填入' }]}>
                    <Input placeholder="请输入分类名称"></Input>
                </Item>
                
            </Form>
        )
    }
}

