import './style.less';

import { Icon, Pagination } from 'antd';
import React, { Component } from 'react';

import { DIST } from 'conf';
import Layout from './Layout';
import { Link } from 'react-router';
import { getArticles } from '@/server/api';
import { randomNum } from '@/utils/util';

export default class Index extends Component {
    state = {
        listData: [],
        count: 0,
        current: 0
    };

    // 获取文章列表
    getArticles = pageNum => {
        getArticles({
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

    toPage = current => {
        this.getArticles(current);
    };

    componentDidMount() {
        this.getArticles(1);
    }
    render() {
        const { listData, count, current } = this.state;
        return (
            <Layout>
                <div className="article-item">
                    {listData.map((item, index) => {
                        let photo = '';
                        if(item.photo) {
                            photo = item.photo;
                        } else {
                            photo = `/assets/images/photos/${randomNum(1, 20)}.jpg`;
                        }
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
                                <div className="acator">
                                    <img src={photo} alt="" />
                                </div>
                                {item.pic ? (
                                    <div className="mainpic">
                                        <Link to={DIST + '/detail?id=' + item.id}><img src={item.pic} /></Link>
                                    </div>
                                ) : null}
                                <p>{item.desc}</p>
                                <Link to={DIST + '/detail?id=' + item.id} className="more">
                                    阅读全文 <Icon type="right-circle-o" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <Pagination current={current} pageSize={10} onChange={this.toPage} total={count} />
            </Layout>
        );
    }
}
