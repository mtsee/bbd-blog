import './sliderbox.less';

import { Divider, Tag } from 'antd';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { DIST } from 'conf';
import { Link } from 'react-router';

@inject(['tags'])
@observer
export default class SliderBox extends Component {
    render() {
        const { tags } = this.props.tags;
        const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];
        let icolor = 0;
        return (
            <div className="sliderbox">
                <div className="hexbox">
                    <div className="hex">
                        <div className="corner-1"></div>
                        <div className="corner-2"></div>
                    </div>
                    <div className="hex">
                        <div className="corner-1"></div>
                        <div className="corner-2"></div>
                    </div>
                    <div className="hex">
                        <div className="corner-1"></div>
                        <div className="corner-2"></div>
                    </div>
                </div>
                <h1>BBD 前端团队</h1>
                <p>FEE 是BBD前端「Web 前端研发部」的内部名称，而 FEE 是 Front End Engineer的缩写。</p>
                <Divider />
                <div className="tags">
                    {
                        tags && tags.map((elem, index) => {
                            if(icolor < colors.length) {
                                icolor++;
                            } else {
                                icolor = 0;
                            }
                            return <Tag key={elem.id} color={colors[icolor]}>{elem.name}</Tag>;
                        })
                    }
                </div>
            </div>
        );
    }
}
