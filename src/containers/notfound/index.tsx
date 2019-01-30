import * as React from 'react';

// import Loading from '@/components/Loading';
import './index.less';

class NotFound extends React.Component {
  public componentDidMount() {
    // Loading.close();
  }
  public render() {
    return (
      <div className="not-found">
        {/* <Header>
          <h1>服务器开小差了</h1>
        </Header> */}
        <div className="body" style={{ 'minHeight': '6.23rem' }}>
          <img src={require('../../images/404.png')} alt="404" />
          <div className="info">抱歉！您访问页面失联啦~</div>
        </div>
      </div>
    );
  }
}
export default NotFound;