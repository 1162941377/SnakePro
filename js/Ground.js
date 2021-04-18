// 这是地板实例对象
const oGround = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUARESIZE, YLEN * SQUARESIZE);

// 背景的初始化
oGround.init = function () {
  this.viewContent.style.left = this.x + 'px';
  this.viewContent.style.top = this.y + 'px';
  this.viewContent.style.width = this.width + 'px';
  this.viewContent.style.height = this.height + 'px';
  this.viewContent.style.position = 'absolute';
  this.viewContent.style.backgroundColor = '#0ff';
  document.body.appendChild(this.viewContent);

  this.viewTable = [];
  let result = null;

  for (let y = 0; y < YLEN; y++) {
    this.viewTable[y] = new Array(XLEN); // 每一行要多少个小方块
    for (let x = 0; x < XLEN; x++) {
      // 调用工厂方法模式中的函数
      if (x === 0 || y === 0 || x === XLEN - 1 || y === YLEN - 1) {
        // 这是墙
        result = SquareFactory.create('Stone', x, y, 'black');
      } else {
        // 这是地板
        result = SquareFactory.create('Floor', x, y, 'orange');
      }
      this.viewTable[y][x] = result; // 将创建的小方块存储起来，便于后续的删除和改动
      this.viewContent.appendChild(result.viewContent); // 显示到页面中
    }
  }
  // console.log(this.viewTable);
};

// oGround.init();

/**
 * 移除对应的x轴和y轴上的方块
 * @param {*} x 
 * @param {*} y 
 */
oGround.remove = function (x, y) {
  // console.log(this);
  // 从视觉上删除
  const newSquare = this.viewTable[y][x];
  // console.log(newSquare);
  // console.log(this.viewTable);
  // console.log(newSquare);
  this.viewContent.removeChild(newSquare.viewContent);
  // 从本地化存储中移除对应的元素
  this.viewTable[y][x] = null;
};

/**
 * 添加对应的方块
 * @param {*} square 
 */
oGround.append = function (square) {
  // console.log(square);
  // 视觉上添加
  this.viewContent.appendChild(square.viewContent);
  // 存储到数组中
  this.viewTable[square.y][square.x] = square;
};
