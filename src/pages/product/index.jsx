import React, { Component } from 'react'
import './index.less'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import {Route,Switch,Redirect} from 'react-router-dom'



export default class Product extends Component {

    render() {
        
        return (
            <Switch>
                <Route path="/product" component={ProductHome} exact></Route>
                <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
                <Route path="/product/detail" component={ProductDetail}></Route>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}
