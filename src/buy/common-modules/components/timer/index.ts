export function myTimer({
  time,
  stopTime,
  runCallBack,
  finishCallBack,
  minInterval
}: any) {
  // @ts-ignore
  const that : any = this as any
  that.minInterval = minInterval || 1000;
  that.status = "stop";
  if (that.minInterval > 0) {
    that.stopTime = stopTime || true;
  } else if (that.minInterval < 0) {
    that.stopTime = stopTime || 0;
  }
  that.currentTime = time;
  that.timeIntervalId = undefined;
  that.finishCallBack = finishCallBack;
  that.runCallBack = runCallBack;
  // 自动start
  that.start();
}

myTimer.prototype.start = function() {
  if (this.status === "stop") {
    this.status = "start";
    this.perSecondCall(true);
    this.timeIntervalId = window.setInterval(() => {
      this.perSecondCall();
    }, Math.abs(this.minInterval));
  }
};

myTimer.prototype.stop = function() {
  window.clearInterval(this.timeIntervalId);
};

myTimer.prototype.perSecondCall = function(firstCall: any) {
  if (firstCall) {
    this.runCallBack && this.runCallBack(this.format(this.currentTime));
  } else if (
    // 如果还有剩余
    Math.abs(Math.abs(this.currentTime) - Math.abs(this.stopTime)) >=
      Math.abs(this.minInterval) ||
    this.stopTime === true
  ) {
    this.currentTime = this.currentTime + this.minInterval;
    this.runCallBack && this.runCallBack(this.format(this.currentTime));
  } else {
    if (this.timeIntervalId) {
      this.stop();
    }
    console.log(this)
    this.finishCallBack && this.finishCallBack(this.currentTime);
  }
};

myTimer.prototype.format = function(second: any) {
  // d h m push(s)
  const timer = [24 * 60 * 60 * 1000, 60 * 60 * 1000, 60 * 1000];
  timer.push(Math.abs(this.minInterval));
  let lastTime = second;
  let arr = timer.map(unit => {
    unit = Math.abs(unit);
    let result = Math.floor(lastTime / unit);
    lastTime = lastTime - result * unit;
    if (result > 9) {
      return String(result);
    } else if (result > 0) {
      return "0" + result;
    } else {
      return "0";
    }
  });
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "0") {
      // 如果上一位也是空的话
      if (i === 0 || newArr[i - 1] === "") {
        newArr.push("");
      } else {
        newArr.push(arr[i]);
      }
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};
