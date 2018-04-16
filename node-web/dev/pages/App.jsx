import './style.less';

import { Link, browserHistory } from 'react-router';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { BackTop } from 'antd';
import Header from './header/Index';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

@inject('user', 'tags') @observer
class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.user.getUser();
        this.props.tags.getTags();
    }

    render() {
        const { user } = this.props.user;

        // 在渲染页面前，先执行getUser判断用户是否登录，如果登录user = object ，如果没有登录 user = false
        if(user === null) {
            return null;
        }
        return (
            <LocaleProvider locale={zhCN}>
                <div className="bodyer">
                    <Header />
                    {this.props.children}
                    <BackTop />
                </div>
            </LocaleProvider>
        );
    }
}

// APP入口
export default App;
