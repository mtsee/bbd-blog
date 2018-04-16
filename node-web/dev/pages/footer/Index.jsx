import './style.less';

import React, { Component } from 'react';

import { DIST } from 'conf';
import { Link } from 'react-router';

export default class Index extends Component {
    render() {
        return (
            <div className="footer">
                <div className="inner">
                    <div className="links">
                        <Link to={DIST + '/'}>Home</Link><i>|</i>
                        <Link to={DIST + '/'}>Example</Link><i>|</i>
                        <Link to={DIST + '/'}>Jobs</Link><i>|</i>
                        <Link to={DIST + '/'}>About</Link><i>|</i>
                        <a target="_blank" href="https://github.com/mtsee/bbd-blog">Github</a>
                    </div>
                    <div className="copyright">
                        Copyright 2018. All right reserved. Powered by BBD-BLOG. Designed by ManTou
                    </div>
                </div>
            </div>
        );
    }
}
