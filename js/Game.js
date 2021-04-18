// 这是游戏界面

const oGame = new Game();
oGame.timer = null; // 定时器
oGame.score = 0; // 得分记录

// 游戏的初始化设置
oGame.init = function () {
  oGround.init();
  oSnake.init(oGround);
  // 初始化食物
  this.createFlood(oGround);
  // 绑定键盘事件
  // next hit delay 类似于防抖节流的效果
  this.snakeMove();
};

// 开始游戏
oGame.start = function () {
  this.timer = setInterval(function () {
    oSnake.move(oGround);
  }, INTERVAL);
};

// 创建食物，并动态改变，方法较low，一旦游戏场景缩小或游戏长时间后，会占用大量的计算时间，不过暂时想不到什么更好的办法
oGame.createFlood = function (ground) {
  let x = 0;
  let y = 0;
  let flag = true;
  while (flag) {
    x = 1 + Math.floor(Math.random() * (XLEN - 2));
    y = 1 + Math.floor(Math.random() * (YLEN - 2));
    let ok = true;
    // console.log(x, y);
    // console.log(XLEN, YLEN);
    // 不断循环，判断是否食物生成的位置信息
    for (let node = oSnake.head; node; node = node.next) {
      // console.log(oSnake.head);
      // console.log(node);
      // 判断是否在蛇身上
      if (x === node.x && y === node.y) {
        ok = false;
        break;
      }
    }
    if (ok) {
      flag = false;
    }
  }

  const oFood = SquareFactory.create('Flood', x, y, 'blue');
  // console.log(oFood.x, oFood.y);
  ground.remove(oFood.x, oFood.y);
  ground.append(oFood);
};

// 蛇的移动
oGame.snakeMove = function () {
  document.onkeydown = function (e) {
    if (e.key === 'ArrowLeft' && oSnake.direction !== DIRECTION.RIGHT) {
      // console.log(1);
      oSnake.direction = DIRECTION.LEFT;
      // console.log(oSnake.direction);
    } else if (e.key === 'ArrowUp' && oSnake.direction !== DIRECTION.DOWM) {
      // console.log(2);
      oSnake.direction = DIRECTION.UP;
      // console.log(oSnake.direction);
    } else if (e.key === 'ArrowRight' && oSnake.direction !== DIRECTION.LEFT) {
      // console.log(3);
      oSnake.direction = DIRECTION.RIGHT;
      // console.log(oSnake.direction);
    } else if (e.key === 'ArrowDown') {
      // console.log(4);
      oSnake.direction = DIRECTION.DOWN;
      // console.log(oSnake.direction);
    }
  };
};

// 游戏结束
oGame.over = function () {
  clearInterval(this.timer);
  alert(this.score);
};

// 游戏的初始化
oGame.init();
