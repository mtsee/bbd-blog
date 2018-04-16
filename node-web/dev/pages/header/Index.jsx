import './style.less';

import { Button, Col, Icon, Input, Modal, Row, message } from 'antd';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { DIST } from 'conf';
import { Link } from 'react-router';
import Login from '../login/Login';
import showdown from 'showdown';

const { TextArea } = Input;

@inject(['user'])
@observer
export default class Index extends Component {
    state = {
        visible: false,
        loginmark: 1
    };

    // 关闭弹窗
    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    // 显示弹窗
    showModal = loginmark => {
        this.setState({
            visible: true,
            loginmark
        });
    };

    // 退出登录
    logout = () => {
        this.props.user.logout();
    }

    // 提交数据
    submitDo = (vals, type) => {
        const { login, register } = this.props.user;
        if (type === 'login') {
            login(vals).then(res => {
                if (res.code === 200) {
                    console.log('登录成功！');
                    this.handleCancel();
                }
            });
        } else {
            register(vals).then(res => {
                if (res.code === 200) {
                    message.success('注册成功！去登录');
                } else {
                    $('.vcode').trigger('click');
                }
            });
        }
    };

    render() {
        const { visible, loginmark } = this.state;
        const { user } = this.props.user;
        return (
            <div className="header">
                <div className="inner">
                    <div className="logo">
                        BBD FEE <i>(Front-end engineer)</i>
                    </div>
                    <div className="navs">
                        <Link activeClassName="active" to={DIST + '/'}>
                            文章
                        </Link>
                        <Link activeClassName="active" to={DIST + '/about'}>
                            关于
                        </Link>
                        <Link activeClassName="active" to={DIST + '/join'}>
                            招聘
                        </Link>
                    </div>
                    <div className="login">
                        {user ? (
                            <span>
                                <a onClick={this.logout}>退出</a>
                                <Link to={DIST + '/user'}>个人中心</Link>
                            </span>
                        ) : (
                            <span>
                                <a onClick={e => this.showModal(1)} className="login-btn">
                                    登录
                                </a>
                                <a onClick={e => this.showModal(0)} className="register-btn">
                                    注册
                                </a>
                            </span>
                        )}
                        {user ? (
                            <Link to={DIST + '/edit'} className="article-btn">
                                <Icon type="edit" style={{ marginRight: 5 }} /> 写文章
                            </Link>
                        ) : null}
                    </div>
                </div>
                <Modal title="登录/注册" visible={visible} footer={null} width={400} onCancel={this.handleCancel}>
                    <Login submit={this.submitDo} setmark={this.showModal} loginmark={loginmark} />
                </Modal>
            </div>
        );
    }
}
