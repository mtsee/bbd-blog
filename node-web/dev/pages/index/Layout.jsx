import React, { Component } from 'react';

import { Carousel } from 'antd';
import { DIST } from 'conf';
import Footer from '../footer/Index';
import { Link } from 'react-router';
import SliderBox from '../common/SliderBox';
import pic1 from '@/assets/images/pic.jpg';
import pic2 from '@/assets/images/pic2.jpg';
import pic3 from '@/assets/images/pic3.jpg';

export default class Layout extends Component {
    render() {
        const { className } = this.props;
        let cName = ['index'];
        if (className) {
            cName.push(className);
        }
        return (
            <div className={cName.join(' ')}>
                <div className="mpic">
                    <Carousel autoplay>
                        <div>
                            <img src={pic1} />
                        </div>
                        <div>
                            <img src={pic2} />
                        </div>
                        <div>
                            <img src={pic3} />
                        </div>
                    </Carousel>
                </div>
                <div className="inner">
                    <SliderBox />
                    <div className="article">{this.props.children}</div>
                </div>
                <Footer />
            </div>
        );
    }
}
