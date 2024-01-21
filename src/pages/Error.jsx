import React from 'react';
import './errorStyle.scss';
import { Typography, Space } from '@douyinfe/semi-ui';
const { Title } = Typography;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Space vertical={true} className="container">
          <img
            src={process.env.PUBLIC_URL + 'error.png'}
            alt="错误提醒"
            className="centered-image"
          />
          <Title heading={5}>糟糕！页面出错了</Title>
        </Space>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
