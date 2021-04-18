// 定义变量

// 游戏场景：宽度系数，高度系数
const XLEN = 25;
const YLEN = 25;

// 每个方块的大小
const SQUARESIZE = 20;

// 定义游戏场景出现的坐标位置
const BASE_X_POINT = 25;
const BASE_Y_POINT = 25;

// 定义蛇移动的时间间隔
const INTERVAL = 300;

// 定义方块
function Square(x, y, width, height, dom) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.viewContent = dom || document.createElement('div');
};

// 原型链上有一个touch方法
Square.prototype.touch = function () {
  console.log('touch');
};

/**
 * 实时更新小方块移动的坐标
 * @param {*} x 
 * @param {*} y 
 */
Square.prototype.update = function (x, y) {
  this.x = x;
  this.y = y;
  this.viewContent.style.top = y * SQUARESIZE + 'px';
  this.viewContent.style.left = x * SQUARESIZE + 'px';
};

// 依次实现继承 floor、flood、stone、snakehead、snakebody、ground、game
const Floor = tool.extends(Square);
const Flood = tool.single(Square);
const Stone = tool.extends(Square);
const SnakeHead = tool.single(Square);
const SnakeBody = tool.extends(Square);
const Snake = tool.single(Square);
const Ground = tool.single(Square);
const Game = tool.single(Square);

// 对应要执行的函数
const STRATEGYMESSAGEENUM = {
  MOVE: 'move',
  EAT: 'eat',
  DIE: 'die',
};
