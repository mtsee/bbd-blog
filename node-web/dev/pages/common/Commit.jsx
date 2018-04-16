import './commit.less';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { DIST } from 'conf';
import { Input, Icon, Button, Divider } from 'antd';
const { TextArea } = Input;

export default class Commit extends Component {
    render() {
        const item = {
            author: '馒头',
            like: 23,
            dislike: 5,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            date: '2018-03-30'
        };
        return (
            <div className="commit">
                <Divider />
                <div className="submit">
                    <TextArea autosize={true} placeholder="写下您的评论" />
                    <div className="tright">
                        <div className="total">99 条评论</div>
                        <Button type="primary">评论</Button>
                    </div>
                </div>
                <div className="list">
                    <ul>
                        {
                            new Array(10).fill(1).map((elem, index) => {
                                return (
                                    <li key={index} className="item">
                                        <div className="acator">
                                            <img src={item.avatar} alt="" />
                                        </div>
                                        <div className="name">{item.author}</div>
                                        <div className="date">{item.date}</div>
                                        <p>{item.content}</p>
                                        <a className="like">
                                            <Icon type="like-o" style={{ marginRight: 2 }} />{item.like}
                                        </a><a className="like">
                                            <Icon type="dislike-o" style={{ marginRight: 2 }} />{item.dislike}
                                        </a>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}