window.onload = function() {
var canvas = document.getElementById("canvas");
var pickColor = document.getElementById('pickColor');
var pickSize = document.getElementById('pickSize');
var pickShape = document.getElementById('pickShape');
var eraseAll = document.getElementById('eraseAll');
// var collection = [];
var squares = [];
var circles = [];
var rectangles = [];
var ctx = canvas.getContext('2d');

function Shape() {
}

function Rectangle(x, y, w, h, color) {
  Shape.call(this);
  this.type = "rectangle";
  this.color = color;
  this.sides = 4;
  this.x = x;
  this.y = y;
  this.wr = w;
  this.hst = h;
}

function Square(x, y, w, color) {
  Shape.call(this);
  this.type = "square";
  this.sides = 4;
  this.color = color;
  this.x = x;
  this.y = y;
  this.wr = w;
  this.hst = w;
}

function Circle(x, y, r, st, color) {
  Shape.call(this);
  this.type = "circle";
  this.color = color;
  this.x = x;
  this.y = y;
  this.wr = r;
  this.hst = st;
}

Rectangle.prototype = new Shape();
Square.prototype = new Shape();
Circle.prototype = new Shape();

Shape.prototype.drawRect = function() {
  if (canvas.getContext) {
    // var ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect (this.x, this.y, this.wr, this.hst);
  }
};

Shape.prototype.drawCircle = function() {
    // var ctx = canvas.getContext('2d');
    var path=new Path2D();
    path.arc(this.x, this.y, this.wr, this.hst, Math.PI*2, true);
    ctx.fillStyle = this.color;
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
    squares.push(item);
    console.log(squares);
  } else if (item.type === "rectangle") {
    rectangles.push(item);
    console.log(rectangles);
  } else if (item.type === "circle") {
    circles.push(item);
    console.log(circles);
  }
};

var rectbtn = document.getElementById('rectbtn');
rectbtn.onclick = function() {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newRect = new Rectangle(width, height, 100 * pickSize.value, 50 * pickSize.value, pickColor.value);
  newRect.drawRect();
  newRect.collect();
};

var squbtn = document.getElementById('squbtn');
squbtn.onclick = function(e) {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newSquare = new Square(width, height, 100 * pickSize.value, pickColor.value);
  newSquare.drawRect();
  newSquare.collect();
};

var cirbtn = document.getElementById('cirbtn');
cirbtn.onclick = function() {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newCircle = new Circle(width, height, 50 * pickSize.value, 0, pickColor.value);
  newCircle.drawCircle();
  newCircle.collect();
};

canvas.addEventListener('click', function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  if (pickShape.value === "Circle") {
    var newCircle = new Circle(x, y, 50 * pickSize.value, 0, pickColor.value);
    newCircle.drawCircle();
    newCircle.collect();
  } else if (pickShape.value === "Square") {
    var newSquare = new Square(x, y, 100 * pickSize.value, pickColor.value);
    newSquare.drawRect();
    newSquare.collect();
  } else if (pickShape.value === "Rectangle") {
    var newRect = new Rectangle(x, y, 100 * pickSize.value,  50 * pickSize.value, pickColor.value);
    newRect.drawRect();
    newRect.collect();
  }
});

eraseRects.onclick = function() {
  for (var i = 0; i < rectangles.length; i++) {
    var type = rectangles[i].type;
    var x = rectangles[i].x;
    var y = rectangles[i].y;
    var wr = rectangles[i].wr;
    var hst = rectangles[i].hst;
    if (type === "rectangle") {
        console.log(rectangles[i]);
        ctx.clearRect(x,y,wr,hst);
      }
    }
  rectangles = [];
  console.log(rectangles);
  console.log(circles);
};

eraseCir.onclick = function() {
  console.log(circles.length);
  for (var i = 0; i < circles.length; i++) {
    var type = circles[i].type;
    var x = circles[i].x;
    var y = circles[i].y;
    var wr = circles[i].wr;
    var hst = circles[i].hst;
    if (type === "circle") {
      console.log(circles[i]);
      ctx.beginPath();
      ctx.arc(x, y, wr, hst, Math.PI*2, true);
      ctx.clearRect(x - wr - 1, y - wr - 1, wr * 2 + 2, wr * 2 + 2);
    }
  }
  circles = [];
  console.log(circles);
  console.log(rectangles);
};
      //
// Closing window bracket
};
