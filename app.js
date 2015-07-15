window.onload = function() {
var canvas = document.getElementById("canvas");
var pickColor = document.getElementById('pickColor');
var pickSize = document.getElementById('pickSize');
var pickShape = document.getElementById('pickShape');
var eraseAll = document.getElementById('eraseAll');
var collection = [];

function Shape() {
}

function Rectangle(x, y, w, h, color, collect) {
  Shape.call(this);
  this.type = "rectangle";
  this.color = color;
  this.sides = 4;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

function Square(x, y, w, color, collect) {
  Shape.call(this);
  this.type = "square";
  this.sides = 4;
  this.color = color;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = w;
}

function Circle(x, y, r, st, color, collect) {
  Shape.call(this);
  this.type = "circle";
  this.color = color;
  this.x = x;
  this.y = y;
  this.r = r;
  this.st = st;
}

Rectangle.prototype = new Shape();
Square.prototype = new Shape();
Circle.prototype = new Shape();

Shape.prototype.drawRect = function() {
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.fillRect (this.x, this.y, this.w, this.h);
  }
};

Shape.prototype.drawCircle = function() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var path=new Path2D();
    path.arc(this.x, this.y, this.r, this.st, Math.PI*2, true); // Outer circle
    // path.moveTo(110,75);
    ctx.fillStyle = this.color;
    ctx.fill(path);
  }
};

Shape.prototype.collectRect = function(x, y, w, h, color) {
  var item = {};
  item.type = this.type;
  item.color = this.color;
  item.x = this.x;
  item.y = this.y;
  item.w = this.w;
  item.h = this.h;
  collection.push(item);
  console.log(collection);
};

var rectbtn = document.getElementById('rectbtn');
rectbtn.onclick = function() {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newRect = new Rectangle(width, height, 100 * pickSize.value, 50 * pickSize.value, pickColor.value);
  newRect.drawRect();
  newRect.collectRect();
};

var squbtn = document.getElementById('squbtn');
squbtn.onclick = function(e) {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newSquare = new Square(width, height, 100 * pickSize.value, pickColor.value);
  newSquare.drawRect();
  newSquare.collectRect();
};

var cirbtn = document.getElementById('cirbtn');
cirbtn.onclick = function() {
  var width = Math.floor(Math.random()*canvas.width);
  var height = Math.floor(Math.random()*canvas.height);
  var newCircle = new Circle(width, height, 50 * pickSize.value, 0, pickColor.value);
  newCircle.drawCircle();
  newCircle.collectCircle();
};

canvas.addEventListener('click', function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  if (pickShape.value === "Circle") {
    var newCircle = new Circle(x, y, 50 * pickSize.value, 0, pickColor.value);
    newCircle.drawCircle();
    // newCircle.collect();
  } else if (pickShape.value === "Square") {
    var newSquare = new Square(x, y, 100 * pickSize.value, pickColor.value);
    newSquare.drawRect();
    newSquare.collectRect();
  } else if (pickShape.value === "Rectangle") {
    var newRect = new Rectangle(x, y, 100 * pickSize.value,  50 * pickSize.value, pickColor.value);
    newRect.drawRect();
    newRect.collectRect();
  }
});

eraseAll.onclick = function() {
  for (var i = 0; i < collection.length; i++) {
    console.log(collection[i]);
  }
};

// Closing window bracket
};
