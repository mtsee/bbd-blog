import React, { Component } from 'react';

import { Tag } from 'antd';

const { CheckableTag } = Tag;

export default class MyTag extends Component {
    constructor(props) {
        super(props);
        this.state = { checked: props.checked };
    }
    handleChange = checked => {
        this.setState({ checked });
        if(this.props.onChange) {
            this.props.onChange(checked);
        }
    };

    componentWillReceiveProps(props) {
        if (props.checked !== this.state.checked) {
            this.setState({
                checked: props.checked
            });
        }
    }
    render() {
        return <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />;
    }
}
