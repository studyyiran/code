import Timer from "./index";

describe("test 倒计时", () => {
  console.log("------------start------------");
  it("正向计时", done => {
    let time = 100;
    let count = 0;
    let minInterval = 100;
    let stopTime = 200;
    const fake = {
      time,
      minInterval,
      stopTime,
      runCallBack: jest.fn(res => {
        if (count === 0) {
          expect(res).toEqual(["0", "0", "0", "01"]);
        } else if (count === 1) {
          expect(res).toEqual(["0", "0", "0", "02"]);
        }
        count++;
      }),
      finishCallBack: res => {
        expect(res).toBe(stopTime);
        done();
      }
    };
    let timer = new Timer(fake);
    expect.assertions(3);
    timer.start();
  });
  it("正向计时 默认参数", done => {
    let time = 100;
    let count = 0;
    let minInterval = 100;
    const fake = {
      time,
      minInterval,
      runCallBack: jest.fn(res => {
        if (count === 0) {
          expect(res).toEqual(["0", "0", "0", "01"]);
        } else if (count === 1) {
          console.log(res);
          expect(res).toEqual(["0", "0", "0", "02"]);
          done();
        }
        count++;
      })
    };
    let timer = new Timer(fake);
    expect.assertions(2);
    timer.start();
  });
  it("逆向倒计时", done => {
    let time = 200;
    let count = 0;
    let minInterval = -100;
    let stopTime = 100;
    const fake = {
      time,
      minInterval,
      stopTime,
      runCallBack: jest.fn(res => {
        if (count === 0) {
          expect(res).toEqual(["0", "0", "0", "02"]);
        } else if (count === 1) {
          expect(res).toEqual(["0", "0", "0", "01"]);
        }
        count++;
      }),
      finishCallBack: res => {
        expect(res).toBe(stopTime);
        done();
      }
    };
    let timer = new Timer(fake);
    expect.assertions(3);
    timer.start();
  });
  it("逆向倒计时 默认参数", done => {
    let time = 100;
    let count = 0;
    let minInterval = -100;
    const fake = {
      time,
      minInterval,
      runCallBack: jest.fn(res => {
        if (count === 0) {
          expect(res).toEqual(["0", "0", "0", "01"]);
        } else if (count === 1) {
          expect(res).toEqual(["0", "0", "0", "0"]);
        }
        count++;
      }),
      finishCallBack: res => {
        expect(res).toBe(0);
        done();
      }
    };
    let timer = new Timer(fake);
    expect.assertions(3);
    timer.start();
  });

  it("format", () => {
    const fake = {
      time: 10
    };
    let timer = new Timer(fake);
    expect(timer.format(24 * 60 * 60 * 1000)).toEqual(["01", "0", "0", "0"]);
  });
});
