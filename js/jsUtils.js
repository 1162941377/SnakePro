// 这是工具方法

const tool = {
  // 圣杯模式继承
  inherit: function (target, origin) {
    const temp = function () { };
    temp.prototype = origin.prototype;
    target.prototype = new temp();
    target.prototype.constructor = target;
  },
  // 便于实现继承关系
  extends: function (origin) {
    const result = function () {
      origin.apply(this, arguments);
    };
    this.inherit(result, origin);
    return result;
  },
  // 实现单例模式
  single: function (origin) {
    const result = (function () {
      let instance;
      return function () {
        if (typeof instance === 'object') {
          return instance;
        }
        instance = this;
        origin && origin.apply(this, arguments);
      };
    })();
    origin && this.inherit(result, origin);
    return result;
  },
};
