import 'antd/dist/antd.less';
import '@/assets/style/animate.css';
import '@/assets/style/markdown.css';
import './style.less';

import { Provider } from 'mobx-react';
import React from 'react';
import Routers from './Routers';
import { browserHistory } from 'react-router'; // 路由
import { render } from 'react-dom';
import stores from './store';

// 路由
render(
    <Provider {...stores}>
        <Routers history={browserHistory} />
    </Provider>,
    document.getElementById('App')
);
