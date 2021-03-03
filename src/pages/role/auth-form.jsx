import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Tree, Input } from 'antd'
import menuList from '../../config/menuConfig'

const Item = Form.Item
//添加设置权限的组件
export default class AuthForm extends Component {
    static propTypes = {
        role: PropTypes.object
    }

    //根据传入角色的menus生成初始状态
    
    // const { menus } = this.props.role
    state = {
        checkedKeys: [...this.props.role.menus],
    }

    onChange=(e)=>{
        this.setState({
            user:{
                ...this.state.user,
                name:e.target.value
            }
        })
    }

    //为父组件提供获取最新menu的方法
    getMenus = () => this.state.checkedKeys

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                {
                    title: item.title,
                    key: item.key,
                    children: (
                        item.children ? this.getTreeNodes(item.children) : null
                    )
                },
            )
            return pre
        }, [])
    }
    onCheck = (checkedKeys) => {
        // console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys })
    };
    //根据新传入的role来更新checkedKeys状态,
    //当组件接收到新的属性时自动调用
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     // debugger;
    //     if ( nextProps.role.name !== prevState.role.name) {
    //         return ({ checkedKeys: nextProps.role.menus })
    //     } 
    //     return null
    // }
    // componentWillReceiveProps(nextProps){
    //     const menus = nextProps.role.menus
    //     this.setState({
    //         checkedKeys: menus
    //     })
    // }
    // getDerivedStateFromProps 
    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        const formItemLayout = {
            labelCol: { span: 4 },//左侧label的宽度
            wrapperCol: { span: 15 },//右侧包裹的宽度
        }
        this.treeNodes = [{
            title: '平台权限',
            key: '0-0',
            children: (this.getTreeNodes(menuList))
        }]
        // console.log(checkedKeys)
        console.log(role,'123433343434')
        return (
            <Form ref={this.props.auth}>
                <Item initialValue='' {...formItemLayout}
                    name=""
                    label="角色名称">
                    <Input placeholder={role.name} disabled></Input>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    // onSelect={onSelect}
                    onCheck={this.onCheck}
                    treeData={this.treeNodes}
                />
            </Form>
        )
    }
}

