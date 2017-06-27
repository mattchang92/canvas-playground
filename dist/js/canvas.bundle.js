/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var addNewBtn = document.getElementById('do-add-ball');

canvas.width = innerWidth;
canvas.height = innerHeight * 0.975;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
var Circle = __webpack_require__(2)(canvas, c, mouse);

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

var GRAVITY = 0.4;
var FRICTION = 0;
// const FRICTION = 0.1;


// Event Listeners
addEventListener("mousemove", function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

// Objects

var circle1 = void 0;
var circle2 = void 0;
var circles = [];

// Implementation
function init() {
	// circle1 = new Circle(100,100,80, 'blue');
	// circle2 = new Circle(500,500,80, 'blue');
	// circle.draw();
	addNewBtn.addEventListener('click', function () {
		circles.push(new Circle(100, 100, 80, 'blue'));
	});
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	// circle1.update();
	// circle2.followMouse(circle1);
	circles.forEach(function (circle) {
		circle.update();
	});

	if (circles.length > 1) {
		for (var i = 0; i < circles.length - 1; i++) {
			for (var j = 1; j < circles.length; j++) {
				circles[i].detectCollision(circles[j]);
			}
		}
	}

	circles.forEach(function (circle) {
		circle.collisionUpdated = false;
	});
}

init();
animate();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(7);
var helpers = __webpack_require__(8);

module.exports = function (canvas, c, mouse) {
	return function Circle(x, y, radius, color) {
		var _this = this;

		this.x = x;
		this.y = y;
		this.dx = 5;
		this.dy = 0;
		this.mass = 5;
		this.fy = this.mass * config.GRAVITY;
		this.fx = 0;
		this.radius = radius;
		this.color = color;
		this.clicked = false;
		this.collisionUpdated = false;

		addEventListener('mousedown', function (event) {
			if (helpers.distance(event.clientX - _this.x, event.clientY - _this.y) < _this.radius) {
				_this.clicked = true;
			}
		});

		addEventListener('mouseup', function (event) {
			_this.clicked = false;
		});

		this.updateX = function () {
			//Slowdown due to friction
			if (_this.dx > 0) _this.dx -= 0.25 * config.FRICTION;
			if (_this.dx > config.MAX_CIRCLE_X_SPEED) _this.dx = config.MAX_CIRCLE_X_SPEED;

			// Bounce off walls
			if (_this.x - _this.radius < 0) {
				if (_this.dx < 0) _this.dx *= -0.8;
			} else if (_this.x > canvas.width - _this.radius) {
				if (_this.dx > 0) _this.dx *= -0.8;
			}

			if (Math.abs(_this.dx) < 0.1) _this.dx = 0;
		};

		this.update = function () {
			if (!_this.clicked) {
				if (!_this.isOnFloor()) _this.dy += config.GRAVITY;
				_this.x += _this.dx;
				_this.y += _this.dy;
			} else if (_this.clicked) {
				// const mouseX = mouse.x;
				_this.dx = mouse.x - _this.x;
				_this.dy = mouse.y - _this.y;
				_this.x = mouse.x;
				_this.y = mouse.y;
			}

			if (_this.dy > 0) _this.dy -= config.FRICTION;

			if (_this.y < -400) {
				if (_this.dy < 0) _this.dy *= -0.8;
			} else if (_this.isOnFloor()) {
				if (_this.dy > 0) _this.dy *= -0.8;
			}

			_this.updateX();
			if (Math.abs(_this.dy) < 0.1) _this.dy = 0;

			_this.draw();
		};

		this.followMouse = function (obj) {
			if (_this.isTouching(obj)) {
				_this.color = 'red';
				obj.color = 'red';
			} else {
				_this.color = 'blue';
				obj.color = 'blue';
			}
			_this.x = mouse.x;
			_this.y = mouse.y - _this.radius;
			_this.draw();
		};

		this.detectCollision = function (secondBall) {
			if (_this.isTouching(secondBall) && !_this.collisionUpdated && !secondBall.collisionUpdated) {
				console.log('is touching');
				_this.dx = (_this.dx * (_this.mass - secondBall.mass) + 2 * secondBall.mass * secondBall.dx) / (_this.mass + secondBall.mass);
				_this.dy = (_this.dy * (_this.mass - secondBall.mass) + 2 * secondBall.mass * secondBall.dy) / (_this.mass + secondBall.mass);
				secondBall.dx = (secondBall.dx * (secondBall.mass - _this.mass) + 2 * _this.mass * _this.dx) / (_this.mass + secondBall.mass);
				secondBall.dy = (secondBall.dy * (secondBall.mass - _this.mass) + 2 * _this.mass * _this.dy) / (_this.mass + secondBall.mass);
				_this.x += _this.dx;
				_this.y -= _this.dy;
				secondBall.x += secondBall.dx;
				secondBall.y += secondBall.dy;
			}
			_this.collisionUpdated = true;
			secondBall.collisionUpdated = true;
			_this.draw();
		};

		this.isTouching = function (obj) {
			return helpers.distance(obj.x - _this.x, obj.y - _this.y) < _this.radius + obj.radius;
		};

		this.isOnFloor = function () {
			return canvas.height - _this.y < _this.radius;
		};

		this.draw = function () {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.fill();
			c.closePath();
		};
	};
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
module.exports = __webpack_require__(1);


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	GRAVITY: 0.4,
	FRICTION: 0.2,
	MAX_CIRCLE_X_SPEED: 40
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	distance: function distance(x, y) {
		return Math.sqrt(x * x + y * y);
	}
};

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map