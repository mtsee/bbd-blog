import { action, computed, observable, runInAction, useStrict } from 'mobx';
// import { clearSession, getSession, setSession } from '@/utils/util';
import { login, logout, register, userInfo } from '@/server/api';

import { message } from 'antd';

// let user = getSession('user');

export default class User {
    @observable user = null; // 如果user = false ，表示没有登录

    @action
    login = data => {
        return login(data).then(res => {
            if (res.code === 200) {
                this.user = res.data;
                // setSession('user', res.data);
            }
            return res;
        });
    };

    @action
    register = data => {
        return register(data).then(res => {
            return res;
        });
    };

    @action
    getUser = () => {
        return userInfo().then(res => {
            if (res.code === 200) {
                this.user = res.data;
                // setSession('user', res.data);
            } else if(res.code === 403){
                // 已经退出登录
                this.user = false;
                console.warn('没有登录');
                // clearSession('user');
            }
            return res;
        });
    };

    @action
    logout = () => {
        return logout().then(res => {
            if(res.code === 200) {
                // clearSession('user');
                message.success('退出登录！');
                this.user = false;
                window.location.href = '/';
            }
            return res;
        });
    }
}
