import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import { PAGE_SIZE } from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AuthForm from './auth-form'
import AddForm from './add-form'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'

export default class Role extends Component {
    state = {
        roles: [],//所有角色的列表
        role: {},//选中的role
        isShowAdd: false, //是否显示添加界面
        isShowAuth: false,//是否显示设置权限界面
    }

    constructor(props) {
        super(props)
        //创建用来保存ref标识的标签对象的容器
        this.addrole = React.createRef()
        this.auth = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: (create_time) => formateDate(create_time)
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({
                    role
                })
            }, // 点击行

        };
    }

    addRole = () => {
        //进行表单验证，只有通过了才向下处理
        this.addrole.current.validateFields().then(async (values) => {
            //隐藏确认框
            this.setState({
                isShowAdd: false
            })
            //收集输入数据
            const { roleName } = values
            this.addrole.current.resetFields()
            //请求添加
            const result = await reqAddRole(roleName)
            if (result.status === 0) {
                //根据结果提示/更新列表显示
                message.success('添加角色成功')
                // this.getRoles()
                const role = result.data
                //更新roles状态：基于原本状态数据更新
                this.setState(state => ({
                    roles: [...state.roles, role]
                }))
            } else {
                message.error('添加角色失败')
            }
        })
            .catch(errorInfo => {
                message.error('失败')
            })
    }

    updateRole = async () => {
        this.setState({
            isShowAuth: false
        })
        const role = this.state.role
        // console.log(this.auth.current)
        const menus = this.auth.current.getMenus()
        role.menus = menus
        role.auth_name = memoryUtils.user.username
        role.auth_time = Date.now()
        //请求更新
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            
           
            //如果当前更新的是自己角色的权限，强制退出
            if(role._id===memoryUtils.user.role_id){
                memoryUtils.user={}
                storageUtils.removeUser()
                this.props.history.replace('/login')
                message.success('当前用户角色权限修改了，重新登录')
            }else {
                this.getRoles()
            }
        } else {
            message.error('设置权限失败')
        }
    }

    // componentWillMount()
    componentWillMount() {
        this.initColumn()
    }
    componentDidMount() {
        this.getRoles()
    }

    createRole = () => {
        this.setState({
            isShowAuth: true
        })
        return (
            <div>hello</div>
        )
    }

    render() {
        const { roles, role, isShowAdd, isShowAuth } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={() => { debugger; this.setState({ isShowAdd: true }) }}>创建角色</Button>&nbsp;
                <Button type="primary" disabled={!role._id} onClick={this.createRole}>创建角色权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table bordered
                    rowSelection={{ type: 'radio', 
                    selectedRowKeys: [role._id],
                    onSelect:(role)=>{//选择某个radio时，回调
                        this.setState({role})
                    } }}
                    onRow={this.onRow}
                    rowKey='_id'
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                    }} />;
                <Modal title="添加角色" visible={isShowAdd} onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.addrole.current.resetFields()
                    }}>
                    <AddForm
                        addrole={this.addrole}
                    />
                </Modal>

                <Modal title="设置角色权限" visible={isShowAuth} onOk={this.updateRole} 
                key={Date.now()}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                        
                    }}>
                    <AuthForm role={{...role}} ref={this.auth}
                    />
                </Modal>
            </Card>
        )
    }
}
