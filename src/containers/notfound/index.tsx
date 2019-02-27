import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

// import Loading from '@/components/Loading';
import './index.less';

class NotFound extends React.Component {
  public componentDidMount() {
    // Loading.close();
  }
  public render() {
    return (
      <div className="page-not-found-container">
        <div className="left">
          <img src={require('@/images/notfound/404_banner.png')} className="pc-404-img" alt="" />
          <img src={require('@/images/notfound/m_404_banner.png')} className="m-404-img" alt="" />
        </div>
        <div className="right">
          <h1>Apologies… something isn’t right here</h1>
          <p>This can’t be what you were looking for. <br />There may be a technical issue that brought you here, or you may be trying to access a page that doesn’t exist.</p>
          <div className="button-box">
            <Button type="primary" size="large"><Link to="/">GO BACK TO HOME</Link></Button>
          </div>
          <p>If your issue persists, please email support@uptradeit.com</p>
        </div>
      </div>
    );
  }
}
export default NotFound;