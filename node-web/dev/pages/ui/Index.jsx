import './style.less';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Menu, Icon, Pagination, Dropdown } from 'antd';
import { DIST } from 'conf';

export default class Index extends Component {

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3rd item</Menu.Item>
            </Menu>
        );

        return (
            <div className="index">
                <h1>UI风格</h1>
                <Button type="primary">UI风格</Button>
                <Link to={DIST + '/'}>返回</Link>
                <br />
                <br />
                <Pagination defaultCurrent={1} total={50} />
                <br />
                <br />
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        Button <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}