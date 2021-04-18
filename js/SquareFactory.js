// 这是工厂方法

function SquareFactory() { };

SquareFactory.create = function (type, x, y, color) {
  if (!SquareFactory.prototype[type]) {
    // 没有此类小方块的构造函数，抛出错误
    throw new Error('this type of square is not exist');
  }
  // 有，再次进行判断是否是第一次创建
  if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
    SquareFactory.prototype[type].prototype = new SquareFactory();
  }
  return new SquareFactory.prototype[type](x, y, color);
};

SquareFactory.prototype.init = function (square, color, ms) {
  square.viewContent.style.width = square.width + 'px';
  square.viewContent.style.height = square.height + 'px';
  square.viewContent.style.position = 'absolute';
  square.viewContent.style.backgroundColor = color;
  square.viewContent.style.left = SQUARESIZE * square.x + 'px';
  square.viewContent.style.top = SQUARESIZE * square.y + 'px';
  square.touch = function () {
    return ms;
  };
};

SquareFactory.prototype.Floor = function (x, y, color) {
  const oFloor = new Floor(x, y, SQUARESIZE, SQUARESIZE);
  this.init(oFloor, color, STRATEGYMESSAGEENUM.MOVE);
  oFloor.update(x, y);
  return oFloor;
};

SquareFactory.prototype.Stone = function (x, y, color) {
  const oStone = new Stone(x, y, SQUARESIZE, SQUARESIZE);
  this.init(oStone, color, STRATEGYMESSAGEENUM.DIE);
  return oStone;
};

SquareFactory.prototype.Flood = function (x, y, color) {
  const oFlood = new Flood(x, y, SQUARESIZE, SQUARESIZE);
  this.init(oFlood, color, STRATEGYMESSAGEENUM.EAT);
  oFlood.update(x, y);
  return oFlood;
};

SquareFactory.prototype.SnakeHead = function (x, y, color) {
  const oSnakeHead = new SnakeHead(x, y, SQUARESIZE, SQUARESIZE);
  this.init(oSnakeHead, color, STRATEGYMESSAGEENUM.DIE);
  oSnakeHead.update(x, y);
  return oSnakeHead;
};

SquareFactory.prototype.SnakeBody = function (x, y, color) {
  const oSnakeBody = new SnakeBody(x, y, SQUARESIZE, SQUARESIZE);
  this.init(oSnakeBody, color, STRATEGYMESSAGEENUM.DIE);
  oSnakeBody.update(x, y);
  return oSnakeBody;
};
