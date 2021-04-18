// 这是蛇的实例

const oSnake = new Snake();

oSnake.head = null; // 头部信息 
oSnake.tail = null; // 尾部信息

// 移动的方向信息
const DIRECTION = {
  LEFT: {
    x: -1,
    y: 0,
  },
  RIGHT: {
    x: 1,
    y: 0,
  },
  UP: {
    x: 0,
    y: -1,
  },
  DOWN: {
    x: 0,
    y: 1,
  },
};

oSnake.init = function (ground) {
  // 依次创建蛇头、蛇身、蛇尾
  const snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
  const snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');
  const snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

  this.head = snakeHead;
  this.tail = snakeBody2;

  // 依次插入到页面中显示，并修改对应的数组中的值
  ground.remove(snakeHead.x, snakeHead.y);
  ground.append(snakeHead);

  ground.remove(snakeBody1.x, snakeBody1.y);
  ground.append(snakeBody1);

  ground.remove(snakeBody2.x, snakeBody2.y);
  ground.append(snakeBody2);

  // 形成链式关系
  snakeHead.last = null;
  snakeHead.next = snakeBody1;

  snakeBody1.last = snakeHead;
  snakeBody1.next = snakeBody2;

  snakeBody2.last = snakeBody1;
  snakeBody2.next = null;

  // 默认方向
  this.direction = DIRECTION.RIGHT;
};

// oSnake.init(oGround);

// 策略模式
oSnake.strategies = {
  move: function (snake, square, ground, flag) {
    // console.log(snake, square, ground);
    const newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green'); // 创建的是蛇身

    // console.log(newBody);

    ground.remove(snake.head.x, snake.head.y);
    ground.append(newBody);

    newBody.next = snake.head.next;
    newBody.next.last = newBody;
    newBody.last = null;

    const newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red'); // 创建的是蛇头

    ground.remove(square.x, square.y);
    ground.append(newHead);

    newHead.last = null;
    newHead.next = newBody;
    newBody.last = newHead;
    snake.head = newHead; // 改变snake中的head的值


    if (!flag) {
      const newFloor = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'orange'); // 创建的是新地板

      ground.remove(snake.tail.x, snake.tail.y);
      ground.append(newFloor);

      snake.tail = snake.tail.last; // 改变尾部的信息
    }
  },
  eat: function (snake, square, ground) {
    this.move(snake, square, ground, true);
    oGame.score++;
    oGame.createFlood(oGround);
  },
  die: function () {
    oGame.over();
  },
};

oSnake.move = function (ground) {
  const square = ground.viewTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
  // console.log(square);
  // console.log(this.direction.x, this.direction.y);
  if (typeof square.touch === 'function') {
    // 如果是函数，则执行
    // console.log(square.touch());
    // console.log(square);
    this.strategies[square.touch()](this, square, ground);
  }
};

// oSnake.move(oGround);
