window.onload = function() {
var canvas = document.getElementById('canvas');
var pickColor = document.getElementById('pickColor');
var pickSize = document.getElementById('pickSize');
var pickShape = document.getElementById('pickShape');
var square = [];
var circle = [];
var rectangle = [];
var ctx = canvas.getContext('2d');

function Shape(x, y, wr, color, hst) {
  this.x = x;
  this.y = y;
  this.wr = wr;
  this.hst = hst;
  this.color = color;
}

function Rectangle(x, y, wr, hst, color) {
  Shape.call(this, x, y, wr, color, hst);
  this.type = "rectangle";
}
Rectangle.prototype = new Shape();

function Square(x, y, wr, color) {
  Shape.call(this, x, y, wr, color);
  this.type = "square";
  this.hst = wr;
}
Square.prototype = new Shape();

function Circle(x, y, wr, hst, color) {
  Shape.call(this, x, y, wr, color, hst);
  this.type = "circle";
}
Circle.prototype = new Shape();

Shape.prototype.drawRect = function() {
  ctx.fillStyle = this.color;
  ctx.fillRect (this.x, this.y, this.wr, this.hst);
};

Shape.prototype.drawCircle = function() {
  ctx.fillStyle = this.color;
  var path=new Path2D();
  path.arc(this.x, this.y, this.wr, this.hst, Math.PI*2, true);
  ctx.fill(path);
};

Shape.prototype.collect = function(x, y, wr, hst, color) {
  var item = {};
  item.type = this.type;
  item.color = this.color;
  item.x = this.x;
  item.y = this.y;
  item.wr = this.wr;
  item.hst = this.hst;
  if (item.type === "square") {
    square.push(item);
    console.log(square);
  } else if (item.type === "rectangle") {
    rectangle.push(item);
    console.log(rectangle);
  } else if (item.type === "circle") {
    circle.push(item);
    console.log(circle);
  }
};

var randomColor = function() {
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);
  var a = Math.random();
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};

function create(x, randomize) {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var color;
  var newItem;
  if (!randomize) {
    color = pickColor.value;
  } else {
    color = randomColor();
  }
  if (x === "rectangle") {
    newItem = new Rectangle(width, height, 100 * pickSize.value, 50 * pickSize.value, color);
    newItem.drawRect();
  } else if (x === "circle") {
    newItem = new Circle(width, height, 50 * pickSize.value, 0, color);
    newItem.drawCircle();
  } else if (x === "square") {
    newItem = new Square(width, height, 100 * pickSize.value, color);
    newItem.drawRect();
  }
  newItem.collect();
}

var randColor = document.getElementById('randomColor');


canvas.addEventListener('click', function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  var color;
  var newItem;
  if (!randColor.checked) {
    color = pickColor.value;
  } else {
    color = randomColor();
  }
  if (pickShape.value === "Circle") {
    newItem = new Circle(x, y, 50 * pickSize.value, 0, color);
    newItem.drawCircle();
    } else {
      if (pickShape.value === "Square") {
      newItem = new Square(x, y, 100 * pickSize.value, color);
      } else if (pickShape.value === "Rectangle") {
      newItem = new Rectangle(x, y, 100 * pickSize.value, 50 * pickSize.value, color);
    }
    newItem.drawRect();
  }
  newItem.collect();
});

function erase(array) {
  for (var i = 0; i < array.length; i++) {
    var type = array[i].type;
    var x = array[i].x;
    var y = array[i].y;
    var wr = array[i].wr;
    var hst = array[i].hst;
    if (array === circle) {
      ctx.beginPath();
      ctx.arc(x, y, wr, hst, Math.PI*2, true);
      ctx.clearRect(x - wr - 1, y - wr - 1, wr * 2 + 2, wr * 2 + 2);
      } else {
      ctx.clearRect(x,y,wr,hst);
      }
    }
  array = [];
}

fillbtn.onclick = function() {
  for (var i = 0; i < 150; i++) {
    var option = Math.floor(Math.random() * 3);
    if (option === 0) {
      create("square", true);
    } else if (option === 1){
      create("circle", true);
    } else {
      create("rectangle", true);
    }
  }
};

rectbtn.onclick = function() {
  create("rectangle", randColor.checked);
  // console.log(randColor.checked);
};

squbtn.onclick = function() {
  create("square", randColor.checked);
};

cirbtn.onclick = function() {
  create("circle", randColor.checked);
};

eraseRects.onclick = function() {
  erase(rectangle);
};

eraseCir.onclick = function() {
  erase(circle);
};

eraseSq.onclick = function() {
  erase(square);
};

// Closing window bracket
};
