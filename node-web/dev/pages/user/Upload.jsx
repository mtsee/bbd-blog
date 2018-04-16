import './style.less';

import { Icon, Upload, message } from 'antd';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import Uploads from '../common/Uploads';
import { updateUser } from '@/server/api';

@inject(['user'])
@observer
export default class Avatar extends Component {
    state = {
        loading: false
    };
    uploading = () => {
        this.setState({
            loading: true
        });
    };
    // 头像上传
    uploadEnd = data => {
        if (data[0].code === 200) {
            let pic = data[0].data.url;
            // 更新user数据
            updateUser({ pic }).then(res => {
                if(res.code === 200) {
                    const { user } = this.props.user;
                    user.pic = pic;
                } else {
                    message.error('修改头像失败！');
                }
            });
        }
    };
    render() {
        const uploadButton = (
            <div className="inners">
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">upload</div>
            </div>
        );
        const { user } = this.props.user;
        return (
            <Uploads className="avatar-uploader" uploadEnd={this.uploadEnd} uploading={this.uploading}>
                {user.pic ? (
                    <div className="inners">
                        <img style={{ width: 116, height: 116, borderRadius: 1000 }} src={user.pic} alt="" />
                    </div>
                ) : (
                    uploadButton
                )}
            </Uploads>
        );
    }
}
