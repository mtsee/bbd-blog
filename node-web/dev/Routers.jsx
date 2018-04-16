import { IndexRedirect, IndexRoute, Route, Router } from 'react-router'; // 路由
import React, { Component } from 'react';

import About from './pages/index/About';
// App为入口
import App from './pages/App';
import { DIST } from 'conf';
import Detail from './pages/detail/Index';
import Edit from './pages/edit/Index';
// 页面
import Index from './pages/index/Index';
import Join from './pages/index/Join';
import UI from './pages/ui/Index';
import User from './pages/user/Index';

window.ajaxArr = [];
class Routers extends Component {
    leavePath() {
        // ...
        window.ajaxArr.forEach(elem => {
            elem && elem.abort();
            elem = null;
        });
        window.ajaxArr = [];
    }
    enterPath() {
        document.body.scrollTop = 0;
    }
    render() {
        return (
            <Router history={this.props.history}>
                <Route path={DIST} component={App}>
                    <Route onEnter={this.enterPath} path={DIST + '/'} component={Index} />
                    <Route onEnter={this.enterPath} path={DIST + '/detail'} component={Detail} />
                    <Route onEnter={this.enterPath} path={DIST + '/about'} component={About} />
                    <Route onEnter={this.enterPath} path={DIST + '/edit'} component={Edit} />
                    <Route onEnter={this.enterPath} path={DIST + '/user'} component={User} />
                    <Route onEnter={this.enterPath} path={DIST + '/join'} component={Join} />
                    <IndexRoute component={Index} />
                </Route>
            </Router>
        );
    }
}

export default Routers;
