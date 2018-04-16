import './style.less';

import { Button, Checkbox, Form, Icon, Input } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;

class LoginForm extends React.Component {

    state = {
        code: '/api/vcode?t=' + +new Date()
    }

    // 登录
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values, this.props.loginmark ? 'login' : 'register');
            }
        });
    }

    // 换验证码
    changeCode = () => {
        this.setState({
            code: '/api/vcode?t=' + +new Date()
        });
    }

    setmark = n => {
        this.props.setmark(n);

        // 清空表单
        this.props.form.setFieldsValue({
            tel: '',
            password: '',
            code: ''
        });
    }

    render() {
        const { loginmark } = this.props; // 0, 1
        const { getFieldDecorator } = this.props.form;
        const { code } = this.state;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('tel', {
                        rules: [
                            { required: true, message: '电话不能为空' }]
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="电话号码" />
                    )}
                </FormItem>
                {!loginmark ? <FormItem>
                    {getFieldDecorator('nick', {
                        rules: [{ required: true, message: '姓名不能为空' }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="姓名" />
                    )}
                </FormItem> : null}
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }]
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                {!loginmark ? <FormItem>
                    {getFieldDecorator('code', {
                        rules: [{ required: true, message: '验证码不能为空' }]
                    })(
                        <div>
                            <img onClick={this.changeCode} className="vcode" src={code} />
                            <Input style={{width: 259}} type="text" placeholder="验证码" />
                        </div>
                    )}
                </FormItem> : null}
                <FormItem>
                    {loginmark ? getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>记住账号</Checkbox>
                    ) : null}
                    {loginmark ? <a className="login-form-forgot" href="">忘记密码</a> : null}
                    <Button type="primary" htmlType="submit" className="login-form-button">{loginmark ? '登录' : '注册'}</Button>
                    {loginmark ? <span>没有账号？ <a onClick={e => this.setmark(0)}>立即注册!</a></span> :
                        <span>已经有账号？ <a onClick={e => this.setmark(1)}>立即登录!</a></span>
                    }
                </FormItem>
            </Form>
        );
    }
}

export default LoginForm = Form.create()(LoginForm);
