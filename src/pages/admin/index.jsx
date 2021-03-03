import React, { Component } from 'react'
import { Redirect,Switch,Route } from 'react-router'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home'
import Category from '../category'
import Product from '../product'
import Role from '../role'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {

    render() {
        const user = memoryUtils.user

        //如果内存没有存储user==>当前没有登录
        if (!user._id) {
            //自动跳转到登录（在render中）
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{margin:'20px',backgroundColor:"white"}}>
                        <Switch>
                        <Route path='/home'component={Home}/>
                        <Route path='/category'component={Category}/>
                        <Route path='/product'component={Product}/>
                        <Route path='/role'component={Role}/>
                        <Route path='/user'component={User}/>
                        <Route path='/charts/bar'component={Bar}/>
                        <Route path='/charts/line'component={Line}/>
                        <Route path='/charts/pie'component={Pie}/>
                        <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#cccccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
