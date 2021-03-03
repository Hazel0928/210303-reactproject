import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    message,
    Modal
} from 'antd'
import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import {PAGE_SIZE} from '../../utils/constants'
import {reqDeleteUser,  reqUsers,reqAddOrUpdateUser} from '../../api/index'
import {ExclamationCircleOutlined} from '@ant-design/icons'
import UserForm from './user-form'

export default class User extends Component {
    addform = React.createRef()
    state={
        users:[], //所有用户列表
        isShow:false,
        roles:[],
    }

    initColumns = () =>{
        this.columns=[
            {
                title:'用户名',
                dataIndex:'username',
            },
            {
                title:'邮箱',
                dataIndex:'email',
            },
            {
                title:'电话',
                dataIndex:'phone',
            },
            {
                title:'注册时间',
                dataIndex:'create_time',
                render: formateDate
            },
            {
                title:'所属角色',
                dataIndex:'role_id',
                render:(role_id) => this.roleNames[role_id]
            },
            {
                title:'操作',
                render:(user)=>(
                    <span>
                        <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={()=>this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            },
        ]
    }

    addOrUpdateUser=async()=>{
        this.setState({isShow:false})
        //收集输入数据
        // console.log(this.addform.current.getFieldsValue())
        const user = this.addform.current.getFieldsValue()
        this.addform.current.resetFields()
        //如果是更新，需要给user指定_id属性
        if(this.user){
            user._id = this.user._id
        }
        //提交添加的请求
        const result = await reqAddOrUpdateUser(user)
        if(result.status===0){
            message.success(`${this.user?'修改':'添加'}用户成功`)
            //更新列表显示
            this.getUsers()
        }
        
    }

    //显示修改页面
    showUpdate=(user)=>{
        console.log(user,' showupdate')
        this.user = user
        this.setState({isShow:true})

    }


    getUsers=async()=>{
        const result = await reqUsers()
        if(result.status === 0){
            const{users,roles} = result.data
            this.initRoleNames(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    //根据role的数组，生成包含所有角色名的对象（属性名用角色id值）
    initRoleNames=(roles)=>{
        const roleNames = roles.reduce((pre,role)=>{
            pre[role._id] = role.name
            return pre
        },{})
        this.roleNames= roleNames
    }

    //删除指定用户
    deleteUser=(user)=>{
        Modal.confirm({
                title: `确认删除${user.username}吗？`,
                icon: <ExclamationCircleOutlined />,
                onOk : async()=> {
                //   return new Promise((resolve, reject) => {
                //     setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                //   }).catch(() => console.log('Oops errors!'));
                    const result = await reqDeleteUser(user._id)
                    if(result.status===0){
                        message.success('删除用户成功')
                        this.getUsers()
                    } else {
                        message.error('删除用户失败')
                    }
                },
    })
}
//显示添加界面
showAdd=()=>{
    this.user = null
    this.setState({isShow:true})
}

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getUsers()
    }
    render() {
        const {users,isShow,roles} = this.state
        const user = this.user||{}
        const title=<Button type="primary" onClick={this.showAdd}>创建用户</Button>
        return (
            <Card title={title}>
                <Table bordered
                    rowKey='_id'
                    dataSource={users}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                    }} />;
                <Modal title={user._id?'修改用户':'添加用户'} visible={isShow} onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        this.addform.current.resetFields()
                        this.setState({ isShow: false })
                    }}>
                    <UserForm key={Date.now()} roles={roles} addform={this.addform} user={user}/>
                </Modal>
            </Card>
        )
    }
}
