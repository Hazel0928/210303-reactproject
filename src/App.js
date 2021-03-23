import React, { Component } from 'react'
import Login from './pages/login'
import Admin from './pages/admin'
import { Redirect, Route, Switch } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                    <Redirect to="/login"></Redirect>
                </Switch>
            </div>
        )
    }
}
