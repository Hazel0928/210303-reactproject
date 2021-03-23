import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import About from '../about'
import Home from '../home'
import BasicButton from '../basic/button'
import BasicIcon from '../basic/icon'
import Authority from '../authority'
import DropDown from '../navigation/dropdown'
import MenuNavi from '../navigation/menu'
import StepsNavi from '../navigation/steps'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Page403 from '../other/Page403'
import Page404 from '../other/Page404'
import Page500 from '../other/Page500'
import { connect } from 'react-redux'

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
    state = {
        collapsed: false,
    }

    toggle = () => {
		this.setState((prevState) => ({ collapsed: !prevState.collapsed }));
	}

    componentDidMount() {
        if (this.props.userStore.isLogin === false) {
            this.props.history.replace({ pathname: '/login' })//已经登陆过
            // return <Redirect to="/login"></Redirect>
        }
    }
    render() {
        const userStore = this.props.userStore
        console.log(userStore)
        //如果内存没有存储user==>当前没有登录
        // if (!user._id) {
        //     //自动跳转到登录（在render中）
        //     return <Redirect to="/login"></Redirect>
        // }
        return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider
                    collapsed={this.state.collapsed}
                    trigger={null}
                    collapsedWidth='80'
                    collapsible>
                    <LeftNav collapsed={this.state.collapsed} />
                </Sider>
                <Layout>
                    <Header collapsed={this.state.collapsed} onToggle={this.toggle}>Header</Header>
                    <Content style={{ margin: '20px', backgroundColor: "white" }}>
                        <Switch>
                            <Redirect exact={true} from="/" to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/basic/button' component={BasicButton} />
                            <Route path='/basic/icon' component={BasicIcon} />
                            <Route path='/authority' component={Authority} />
                            <Route path='/about' component={About} />
                            <Route path='/navigation/dropdown' component={DropDown} />
                            <Route path='/navigation/menu' component={MenuNavi} />
                            <Route path='/navigation/steps' component={StepsNavi} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Route path='/others/403' component={Page403} />
                            <Route path='/others/404' component={Page404} />
                            <Route path='/others/500' component={Page500} />
                            {/* 上面没有一个匹配 */}
                            {/* <Route component={NotFound} /> */}
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#cccccc' }}>React-Admin ©2021 Created by Hazel</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(
    state => ({
        userStore: state.userStore
    }),
    {}
)(Admin)