import React, { Component } from 'react'
import App from './App'
import ReactDom from 'react-dom'
import {BrowserRouter} from 'react-router-dom'


// 将App组件标签渲染到index页面的div上
ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'))