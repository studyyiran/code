

newTimer(time) {
    let { finishCallBack } = this.props;
    const that = this;
    const info = {
      time: time,
      runCallBack: times => {},
      finishCallBack: () => {
        that.setState({
          times: []
        });
      }
    };
    this.timer = new Timer(info);
    this.timer.start();
  }

修改
    1）增加了正数计时
    2) 增加第0秒处理