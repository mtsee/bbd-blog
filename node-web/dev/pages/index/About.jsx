import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { DIST } from 'conf';
import { Divider } from 'antd';
import Layout from './Layout';
import { Link } from 'react-router';

export default class About extends Component {
    render() {
        return (
            <Layout className="about">
                <h3>关于我们</h3>
                <Divider />
                <div>
                    <p>BBD网UED（BBD网设计中心），是BBD网的核心支持部门之一，负责BBD网络媒体各部门及频道的建设工作。</p>
                    <p>Web2.0，我们进行了BBD网首页的自我革命</p>
                    <p>BBD体育世界杯报道，我们承担了所有的设计工作</p>
                    <p>BBD新闻“马航”等重大事件，我们作为设计支持的中坚力量</p>
                    <p>BBD网各内容频道改版，我们一直敢为人先</p>
                    <p>移动H5时代，我们在探索与创新的道路上……</p>
                    <p>
                        我们在运营中积累了丰富的经验，并设计了大量前瞻性的产品，已成长为包括视觉设计、前端开发、交互设计等70多人的团队，成为公司乃至行业的优秀设计团队。
                    </p>
                    <p>
                        我们始终致力于互联网媒体和产品的设计与创新，我们所追求的，是希望用设计与你产生共鸣，带给你最好的体验。
                    </p>
                    <p>&nbsp;</p>
                    <p>更多交流，请联系</p>
                    <p>fee@bbd.com</p>
                </div>
            </Layout>
        );
    }
}
