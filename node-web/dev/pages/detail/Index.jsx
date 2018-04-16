import './style.less';

import { Divider, Icon, message } from 'antd';
import React, { Component } from 'react';
import { getArticle, updateLike } from '@/server/api';
import { isNot, parseQueryString, randomNum } from '@/utils/util';

import Commit from '../common/Commit';
import { DIST } from 'conf';
import { Link } from 'react-router';
import SliderBox from '../common/SliderBox';
import qrcode from '@/assets/images/qrcode.jpg';

export default class Index extends Component {
    state = {
        data: null
    };
    componentDidMount() {
        const query = parseQueryString();
        if (isNot(query.id)) {
            message.error('未选择任何文章！');
            return;
        }
        getArticle({ id: query.id }).then(res => {
            if (res.code === 200) {
                if (!res.data.photo) {
                    res.data.photo = `/assets/images/photos/${randomNum(1, 20)}.jpg`;
                }
                this.setState(
                    {
                        data: res.data
                    },
                    () => {
                        // 生成二维码
                        $('#qrcodebox').qrcode({
                            text: location.href,
                            width: 110,
                            height: 110,
                            level: 'L',
                            background: '#fff'
                        });
                    }
                );
            } else {
                message.error(res.msg);
            }
        });
    }

    updateLike = () => {
        const query = parseQueryString();
        updateLike({ id: query.id }).then(res => {
            if (res.code === 200) {
                let { data } = this.state;
                data.like++;
                this.setState({ data });
            } else {
                message.error(res.msg);
            }
        });
    };

    render() {
        const { data } = this.state;
        if (!data) {
            return <div className="detail">loading...</div>;
        }
        return (
            <div className="detail">
                <div className="article">
                    <h1>
                        <a>{data.title}</a>
                    </h1>
                    <div className="other">
                        <div className="acator">
                            <img src={data.photo} alt="" />
                        </div>
                        <span>{data.author}</span>
                        <i>|</i>
                        <span>{data.date}</span>
                        <i>|</i>
                        <span>
                            {data.tags.split(',').map((elem, index) => {
                                return (
                                    <a className="tag" key={index}>
                                        {elem}
                                    </a>
                                );
                            })}
                        </span>
                        <a className="like" onClick={this.updateLike}>
                            <Icon type="like-o" style={{ marginRight: 2 }} /> {data.like}
                        </a>
                    </div>
                    <Divider />
                    <div className="rich-text">
                        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: data.content }} />
                    </div>
                    {/* <Commit /> */}
                </div>
                <div className="right">
                    <div id="qrcodebox" />
                    <p>手机上查看</p>
                </div>
            </div>
        );
    }
}
