import React, { Component } from 'react';
import { Upload, message } from 'antd';

export default class Uploads extends Component {
    /**
     * @desc 上传
     */
    handleChange = info => {
        let file = info.file;
        if (file.status === 'uploading') {
            // this.setState({ loading: true });
            this.props.uploading && this.props.uploading();
            return;
        }
        if (file.status === 'done') {
            if (this.props.uploadEnd) {
                this.props.uploadEnd(file.response, file);
            }
        }
    };
    beforeUpload(file) {
        const fileType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!fileType) {
            message.error('请上传格式为jpg,png,gif的图片!');
        }
        const isLt1M = file.size / 1024 / 1024 < 1;
        if (!isLt1M) {
            message.error('请上传小于1M的图片!');
        }
        return fileType && isLt1M;
    }

    render() {
        let { data, children, multiple, className } = this.props;
        let set = {
            multiple: multiple || false,
            name: 'filename',
            action: '/api/upload',
            showUploadList: false,
            beforeUpload: this.beforeUpload,
            onChange: this.handleChange,
            data
        };
        if(className) {
            set.className = className;
        }
        return <Upload {...set}> {children}</Upload>;
    }
}
