import React, { Component } from 'react'
import {
    Table,
} from 'antd'
import users from '../../utils/users'


export default class Authority extends Component {
    constructor(props){
        super(props)
        this.initColumns()
    }
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '角色',
                dataIndex: 'roles',
                key: 'roles',
            },
        ];

        this.dataSource = users
    }
    render() {
        return (
            <div>
                <Table dataSource={this.dataSource} columns={this.columns} />
            </div>
        )
    }
}
