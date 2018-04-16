import { Divider, Icon, Modal, Pagination, message } from 'antd';
import React, { Component } from 'react';
import { delArticle, getArticles } from '@/server/api';
import { inject, observer } from 'mobx-react';

import { DIST } from 'conf';
import Layout from '../index/Layout';
import { Link } from 'react-router';
import Upload from './Upload';

const confirm = Modal.confirm;
@inject('user')
@observer
export default class User extends Component {
    state = {
        listData: [],
        count: 0,
        current: 0
    };

    // 获取文章列表
    getArticles = pageNum => {
        getArticles({
            owner: true,
            pageSize: 10,
            pageNum
        }).then(res => {
            if (res.code === 200) {
                this.setState({
                    listData: res.data,
                    count: res.count,
                    current: pageNum
                });
            }
        });
    };

    // 删除文章
    delArticle = item => {
        confirm({
            title: '系统提示',
            content: '是否删除这篇文章？',
            onOk: () => {
                delArticle({ id: item.id }).then(res => {
                    if (res.code === 200) {
                        // 删除
                        message.success('删除成功！');
                        this.getArticles(1);
                    } else {
                        message.error(res.msg);
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    };

    toPage = current => {
        this.getArticles(current);
    };

    componentDidMount() {
        this.getArticles(1);
    }

    render() {
        const { listData, count, current } = this.state;
        const { user } = this.props.user;
        if(!user) {
            return <div>请先登录！</div>;
        }
        return (
            <Layout className="about">
                <div className="user">
                    <div className="photos">
                        <Upload />
                        <div className="nick">
                            {user.username} | 文章数 {count}
                        </div>
                    </div>
                    <Divider />
                    <div className="article-item article-item2">
                        {listData.map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        opacity: 0,
                                        animation: `fadeInUp 1s ease ${index * 0.2}s 1 normal forwards running`
                                    }}
                                    className="item"
                                >
                                    <h1>
                                        <Link to={DIST + '/detail?id=' + item.id}>{item.title}</Link>
                                    </h1>
                                    <div className="other">
                                        <span>作者：{item.author || '未知'}</span>
                                        <i>|</i>
                                        <span>{item.date}</span>
                                        <i>|</i>
                                        <span>
                                            {item.tags.split(',').map((elem, index) => {
                                                return (
                                                    <a className="tag" key={index}>
                                                        {elem}
                                                    </a>
                                                );
                                            })}
                                        </span>
                                    </div>
                                    <p>{item.desc}</p>
                                    <a onClick={e => this.delArticle(item)} className="delbtn">
                                        <Icon type="delete" /> 删除
                                    </a>
                                    <Link to={DIST + '/edit?id=' + item.id} className="editbtn">
                                        <Icon type="form" /> 编辑
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <Pagination current={current} pageSize={10} onChange={this.toPage} total={count} />
                </div>
            </Layout>
        );
    }
}
