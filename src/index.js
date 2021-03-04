import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';


// 将App组件标签渲染到index页面的div上
ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  , document.getElementById('root')
  );