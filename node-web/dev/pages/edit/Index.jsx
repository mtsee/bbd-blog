import './style.less';

import { Button, Col, Divider, Icon, Input, Row, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import React, { Component } from 'react';
import { addArticle, getArticle, updateArticle, updateDraft } from '@/server/api';
import { defaultMd, switchType } from './util';
import { inject, observer } from 'mobx-react';
import { isNot, parseQueryString } from '@/utils/util';

import { DIST } from 'conf';
import MyTag from '../common/MyTag';
import Uploads from '../common/Uploads';
import { insertAfterText } from './focus';
import showdown from 'showdown';

const { TextArea } = Input;

@inject('user', 'tags')
@observer
export default class Index extends Component {
    state = {
        shtml: '',
        title: '',
        pic: '',
        desc: '',
        author: '',
        data: '',
        tags: ''
    };

    // showdown
    converter = new showdown.Converter({
        simpleLineBreaks: true
    });

    // 设置样式
    resethljs = () => {
        $('.markdown-body')
            .find('pre code')
            .each(function(i, block) {
                hljs.highlightBlock(block);
            });
    };

    // 变化参数
    changeVal = (val, keys) => {
        this.setState({
            [keys]: val
        });
    };

    // 插入数据
    toolbar = type => {
        let val = switchType(type);
        insertAfterText($('.markdowntext')[0], val);
        this.setValues($('.markdowntext').val());
    };

    // 图片上传
    uploadEnd = data => {
        console.log(data[0]);
        if (data[0].code === 200) {
            this.setState({
                pic: data[0].data.url
            });
        }
    };

    // 设置值
    setValues = data => {
        // 设置值
        this.setState(
            {
                data,
                shtml: this.converter.makeHtml(data)
            },
            () => {
                this.resethljs();
            }
        );
    };

    // 保存草稿
    updateDraft = () => {
        const query = parseQueryString();
        const { data } = this.state;
        if (query.id) {
            updateDraft({
                id: query.id,
                data
            }).then(res => {
                if (res.code === 200) {
                    message.success('保存草稿成功！');
                } else {
                    message.error('保存草稿失败！');
                }
            });
        } else {
            this.addArticle(true);
        }
    };

    // 发布文章
    addArticle = (hide) => {
        const { title, pic, desc, author, data, tags } = this.state;
        if (!title) {
            message.error('必须填写标题！');
            return;
        }
        const query = parseQueryString();
        if (isNot(query.id)) {
            // 添加文章
            addArticle({hide, title, pic, desc, author, content: $('.markdown-body').html(), data, tags }).then(res => {
                if (res.code === 200) {
                    console.log(res);
                    message.success(hide ? '保存草稿成功！' : '发布成功！');
                    // 发布成功后，修改url的参数，避免重新提交
                    browserHistory.push('/edit?id=' + res.data.id);
                } else {
                    message.error('发布文章失败！');
                }
            });
        } else {
            // 修改文章
            updateArticle({
                id: query.id,
                title,
                pic,
                desc,
                author,
                content: $('.markdown-body').html(),
                data,
                tags,
                hide: 0
            }).then(res => {
                if (res.code === 200) {
                    console.log(res);
                    message.success('更新成功！');
                } else {
                    message.error('更新文章失败！');
                }
            });
        }
    };

    // 删图片
    deletePic = () => {
        this.setState({
            pic: ''
        });
    };

    // 选择，取消tags
    setTags = (e, elem) => {
        let { tags } = this.state;
        tags = tags ? tags.split(',') : [];
        if(e) {
            tags.push(elem.name);
        }else {
            tags.splice(tags.findIndex(item => item === elem.name), 1);
        }
        this.setState({
            tags: tags.join(',')
        });
    };

    componentDidMount() {
        // 获取数据
        const query = parseQueryString();
        if (isNot(query.id)) {
            // 新建
            this.setValues(defaultMd);
        } else {
            // 修改文章
            getArticle({ id: query.id }).then(res => {
                if (res.code === 200) {
                    const { title, pic, desc, author, data, tags } = res.data;
                    this.setState({ title, pic, desc, author, data, tags }, () => {
                        this.setValues(data);
                    });
                } else {
                    message.error('获取文章失败！');
                }
            });
        }

        // 载入markdown 配置
        this.converter.setFlavor('github');

        // 载入markdown 样式
        hljs.initHighlightingOnLoad();

        setTimeout(() => {
            $('.header .inner').css('width', '1400px');
        }, 0);
    }

    componentWillUnmount() {
        $('.header .inner').removeAttr('style');
    }

    render() {
        const { shtml, title, pic, desc, author, data, tags } = this.state;
        const taglist = this.props.tags.tags;
        if(!this.props.user.user) {
            return <div>请先登录！</div>;
        }
        return (
            <div className="edit">
                <Row className="info">
                    <Col span={12}>
                        <div className="title">
                            <Input
                                onChange={e => this.changeVal(e.target.value, 'title')}
                                value={title}
                                placeholder="输入标题"
                            />
                        </div>
                        {/* <div className="title">
                            <Input
                                onChange={e => this.changeVal(e.target.value, 'author')}
                                value={author}
                                placeholder="作者"
                            />
                        </div> */}
                        <div className="desc">
                            <TextArea
                                onChange={e => this.changeVal(e.target.value, 'desc')}
                                value={desc}
                                placeholder="内容摘要"
                                rows={2}
                            />
                        </div>
                        <div className="tags">
                            {taglist &&
                                taglist.map((elem, index) => {
                                    return (
                                        <MyTag
                                            onChange={e => this.setTags(e, elem)}
                                            checked={tags.indexOf(elem.name) !== -1}
                                            key={elem.id}
                                        >
                                            {elem.name}
                                        </MyTag>
                                    );
                                })}
                        </div>
                        <div className="ralign">
                            <Button onClick={this.updateDraft}>保存草稿</Button>
                            <Button onClick={this.addArticle} type="primary">
                                发布文章
                            </Button>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="img">
                            {pic ? (
                                <span>
                                    <img src={pic} />
                                    <div className="hasimg">
                                        <Uploads uploadEnd={this.uploadEnd}>
                                            <a>
                                                <Icon type="camera-o" />
                                            </a>
                                        </Uploads>
                                        <a onClick={this.deletePic}>
                                            <Icon type="delete" />
                                        </a>
                                    </div>
                                </span>
                            ) : (
                                <Uploads uploadEnd={this.uploadEnd}>
                                    <Icon type="upload" />
                                </Uploads>
                            )}
                        </div>
                    </Col>
                </Row>
                <Divider />
                <div className="clearfix editbox">
                    <div className="edititem">
                        <div className="md-header btn-toolbar">
                            <a onClick={e => this.toolbar('h')} className="icobbd ico-h" />
                            <a onClick={e => this.toolbar('iline')} className="icobbd ico-iline" />
                            <a onClick={e => this.toolbar('blod')} className="icobbd ico-blod" />
                            <a onClick={e => this.toolbar('tline')} className="icobbd ico-tline" />
                            <a onClick={e => this.toolbar('code')} className="icobbd ico-code" />
                            <a onClick={e => this.toolbar('list')} className="icobbd ico-list" />
                            <a onClick={e => this.toolbar('list2')} className="icobbd ico-list2" />
                            <a onClick={e => this.toolbar('link')} className="icobbd ico-link" />
                            <a onClick={e => this.toolbar('table')} className="icobbd ico-table" />
                            <a onClick={e => this.toolbar('from')} className="icobbd ico-from" />
                            <a onClick={e => this.toolbar('line')} className="icobbd ico-line" />
                        </div>
                        <TextArea
                            className="markdowntext"
                            autosize={true}
                            value={data}
                            onChange={e => this.setValues(e.target.value)}
                        />
                    </div>
                    <div className="edititem">
                        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: shtml }} />
                    </div>
                </div>
            </div>
        );
    }
}
