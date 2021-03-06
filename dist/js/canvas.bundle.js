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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	GRAVITY: 0.4,
	FRICTION: 0.2,
	MAX_CIRCLE_X_SPEED: 40
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	distance: function distance(x, y) {
		return Math.sqrt(x * x + y * y);
	}
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var addNewBtn = document.getElementById('do-add-ball');
var addAtomBtn = document.getElementById('do-add-atom');
var makeBubblesBtn = document.getElementById('do-make-bubbles');
var makeOrbBtn = document.getElementById('do-make-orb');
var clearCanvasBtn = document.getElementById('do-clear-canvas');

canvas.width = innerWidth;
canvas.height = innerHeight * 0.975;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
var Circle = __webpack_require__(6)(canvas, c, mouse);
var Atom = __webpack_require__(4)(canvas, c);
var Bubble = __webpack_require__(5)(canvas, c, mouse);
var FallingOrb = __webpack_require__(7)(canvas, c);
var Spark = __webpack_require__(9)(canvas, c);

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
var atom = void 0;
var timer = 0;
var makeBubbles = false;
var rainOrbs = false;;
var bubbles = [];
var sparks = [];
var orbs = [];
// Implementation
function init() {
	addNewBtn.addEventListener('click', function () {
		circles.push(new Circle(100, 100, 80, 'blue'));
	});

	addAtomBtn.addEventListener('click', function () {
		atom = new Atom(canvas.width / 2, canvas.height / 2, 15, '#FA942E');
		// atom = new Atom(canvas.width/2, canvas.height/2, 15, '#1AA4D1')
	});

	makeOrbBtn.addEventListener('click', function () {
		rainOrbs = true;
	});

	makeBubblesBtn.addEventListener('click', function () {
		makeBubbles = true;
	});
	// atom = new Atom(canvas.width/2, canvas.height/2, 10, '#F2F3F4')

	clearCanvasBtn.addEventListener('click', function () {
		circles = [];
		atom = null;
		makeBubbles = false;
		rainOrbs = false;
	});
}

// Animation Loop
function animate() {
	timer++;
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	// circle1.update();
	// circle2.followMouse(circle1);
	if (circles.length) {
		circles.forEach(function (circle) {
			circle.update();
		});

		if (circles.length > 1) {
			for (var i = 0; i < circles.length - 1; i++) {
				for (var j = i + 1; j < circles.length; j++) {
					circles[i].detectCollision(circles[j]);
				}
			}
		}

		circles.forEach(function (circle) {
			circle.collisionUpdated = false;
		});
	}

	if (atom) atom.update(timer * 0.5);

	if (makeBubbles) {
		var randColor = Math.floor(3 * Math.random());

		bubbles.push(new Bubble(50, randColor));
		bubbles.forEach(function (bubble) {
			bubble.update();
			if (bubble.destroy()) {
				bubbles.shift();
			}
		});
	}

	if ((timer % 100 === 0 || timer % 75 === 0) && rainOrbs) {
		var x = Math.random() * canvas.width;
		var y = -200;
		var dx = 6 * Math.random() - 3;
		var radius = 10 * Math.random() + 10;

		orbs.push(new FallingOrb(x, y, dx, radius));
	}

	if (orbs.length) {
		orbs = orbs.filter(function (orb) {
			return !orb.destroy();
		});

		orbs.forEach(function (orb) {
			orb.update();
			if (orb.bounces) {
				orb.bounces--;
				var sparksNumber = 4 * Math.random() + 10;
				for (var _i = 0; _i < sparksNumber; _i++) {
					var _dx = 8 * Math.random() - 4;
					var dy = Math.random() * orb.dy;
					sparks.push(new Spark(orb.x, orb.y, _dx, dy));
				}
			}
		});
	}

	if (sparks.length) {
		sparks = sparks.filter(function (spark) {
			return !spark.isOnFloor();
		});

		sparks.forEach(function (spark) {
			spark.update();
		});
	}

	if (sparks.length) console.log('sparks', sparks);
	if (orbs.length) console.log('orbs', orbs);
}

init();
animate();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);
var particle = __webpack_require__(8);

module.exports = function (canvas, c) {

	var Particle = particle(canvas, c);
	// const particles = new Array(10);

	return function Atom(x, y, radius, color) {
		var _this = this;

		this.x = x;
		this.y = y;
		this.radius = radius;
		this.originalRadius = radius;
		this.beatRadius = radius * 1.2;
		this.color = color;
		// this.particle = [];

		// this.particles = particles.map(() => {
		// 	const rand1 = Math.random();
		// 	const rand2 = Math.random();
		//
		// 	const particle = new Particle(canvas.width/2, canvas.height/2, (rand1 * 300), (rand2 * 300), 2, '#F2F3F4', (rand1 * 2 * Math.PI));
		// 	return particle;
		// })
		// console.log('this.particles', this.particles);


		this.particles = [new Particle(canvas.width / 2, canvas.height / 2, 150, 300, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), -1, -1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 240 * (Math.PI / 180), -1, -1, 1), new Particle(canvas.width / 2, canvas.height / 2, 150, 300, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), -1, -1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 240 * (Math.PI / 180), -1, -1, 1), new Particle(canvas.width / 2, canvas.height / 2, 150, 300, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 0, 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), 1, 1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 80 * (Math.PI / 180), -1, -1, 1), new Particle(canvas.width / 2, canvas.height / 2, 300, 150, 5, 240 * (Math.PI / 180), -1, -1, 1)];

		// new Particle(canvas.width/2, canvas.height/2, 50, 100, 2, '#F2F3F4')

		this.update = function (timer) {
			_this.particles.forEach(function (particle) {
				particle.update(timer);
			});

			if (timer % 10 === 0) {
				_this.radius = _this.beatRadius;
				c.shadowBlur = 75;
			} else {
				_this.radius = _this.originalRadius;
				c.shadowBlur = 50;
			}

			_this.draw();
		};

		this.draw = function () {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowColor = _this.color;
			// c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	};
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);

module.exports = function (canvas, c, mouse) {

	var colors = ['#F2F3F4', '#148BE6', '#7AC243'];

	return function Bubble(radius, randColor) {
		var _this = this;

		this.x = mouse.x;
		this.y = mouse.y;
		this.radius = radius;
		this.color = colors[randColor];
		this.dx = 6 * Math.random() - 3;
		this.dy = 6 * Math.random() - 3;

		// new Particle(canvas.width/2, canvas.height/2, 50, 100, 2, '#F2F3F4')

		this.update = function () {
			_this.x += _this.dx;
			_this.y += _this.dy;
			_this.radius -= 1;
			_this.draw();
		};

		this.destroy = function () {
			return _this.radius < 3;
		};

		this.draw = function () {

			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowColor = _this.color;
			c.lineWidth = 1;
			c.shadowBlur = 5;
			c.strokeStyle = _this.color;
			c.stroke();
			c.closePath();
		};
	};
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);

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
			var vObj = {};
			var vThis = {};
			vObj.x = obj.x + 2 * obj.dx;
			vObj.y = obj.y + 2 * obj.dy;
			vThis.x = _this.x + 2 * _this.dx;
			vThis.y = _this.y + 2 * _this.dy;

			return helpers.distance(vObj.x - vThis.x, vObj.y - vThis.y) < _this.radius + obj.radius;
			// helpers.distance((obj.x - this.x), (obj.y - this.y)) < (this.radius + obj.radius)
		};

		this.isOnFloor = function () {
			return canvas.height - _this.y < _this.radius;
		};

		this.draw = function () {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowBlur = 0;
			c.fill();
			c.closePath();
		};
	};
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);

module.exports = function (canvas, c) {
	return function FallingOrb(x, y, dx, radius) {
		var _this = this;

		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = 30;
		this.radius = radius;
		this.color = '#F2F3F4';
		this.bounces = 0;

		this.update = function () {

			_this.dy += config.GRAVITY;
			_this.x += _this.dx;
			_this.y += _this.dy;

			if (_this.isOnFloor()) {
				_this.bounces++;
				if (_this.radius > 3) {
					_this.dx *= 0.8;
					_this.dy *= -0.5;
					_this.radius *= 0.6;
				}
			}

			_this.draw();
		};

		this.destroy = function () {
			return _this.radius < 3;
		};

		this.isOnFloor = function () {
			return canvas.height - _this.y < _this.radius + _this.dy;
		};

		this.draw = function () {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowColor = _this.color;
			c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	};
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);

module.exports = function (canvas, c) {
	return function Particle(x, y, xOrbit, yOrbit, radius, offsetAngle, offsetX, offsetY, reverse) {
		var _this = this;

		this.x;
		this.y;
		this.dx;
		this.dy;
		this.xOrbit = xOrbit;
		this.yOrbit = yOrbit;
		this.xCenter = x;
		this.yCenter = y;
		this.radius = radius;
		this.color = '#FA942E';
		// this.color = '#1AA4D1';
		this.orbitDistance;

		// const rand = Math.random();

		this.update = function (timer) {
			var newX = reverse * (offsetX * xOrbit) * Math.sin(0.05 * timer * Math.PI + offsetAngle) + _this.xCenter;
			var newY = offsetY * yOrbit * Math.cos(0.05 * timer * Math.PI) + _this.yCenter;

			_this.dx = newX - _this.x;
			_this.dy = newY - _this.y;
			_this.x = newX;
			_this.y = newY;
			_this.orbitDistance = helpers.distance(_this.x - _this.xCenter, _this.y - _this.yCenter);

			_this.draw(timer);
		};

		this.draw = function (timer) {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowColor = _this.color;
			c.shadowBlur = 40 - (Math.abs(_this.dx) + Math.abs(_this.dy));
			c.fill();
			c.closePath();

			// let startAngle;
			// if ((this.x - this.xCenter) > 0) {
			// 	startAngle = Math.asin((this.y - this.yCenter)/(this.orbitDistance));
			// } else {
			// 	startAngle = Math.acos((this.y - this.yCenter)/(this.orbitDistance)) + (0.5 * Math.PI);
			// }
			// console.log('orbit distance', this.orbitDistance);
			// // const startAngle = -0.05 * timer * Math.PI;
			// // const startAngle = -(Math.sin(0.05 * timer * Math.PI));
			// // const endAngle = (Math.cos(0.05 * timer * Math.PI));
			//
			// c.beginPath();
			// // c.arc(this.xCenter, this.yCenter, 200, startAngle, endAngle, true);
			// // c.arc(this.xCenter, this.yCenter, this.orbitDistance, startAngle, (startAngle + 0.3 * Math.PI), false);
			// c.bezierCurveTo(this.xCenter, this.yCenter, this.orbitDistance, startAngle, (startAngle + 0.3 * Math.PI), false);
			// c.lineWidth = 0.3;
			//
			// // line color
			// c.strokeStyle = 'white';
			// c.stroke();
		};
	};
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var config = __webpack_require__(0);
var helpers = __webpack_require__(1);

module.exports = function (canvas, c) {
	return function FallingOrb(x, y, dx, dy) {
		var _this = this;

		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		// this.dy = orbDy * ;
		this.radius = 2;
		this.color = '#F2F3F4';

		this.update = function () {

			_this.dy += config.GRAVITY;
			_this.x += _this.dx;
			_this.y += _this.dy;

			if (_this.isOnFloor()) {
				console.log('on floor');
				if (_this.radius > 3) {
					_this.dy *= -0.6;
					_this.radius *= 0.6;
				}
			}

			_this.draw();
		};

		this.destroy = function () {
			return _this.radius < 3;
		};

		this.isOnFloor = function () {
			return canvas.height - _this.y < _this.radius + _this.dy;
		};

		this.draw = function () {
			c.beginPath();
			c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
			c.fillStyle = _this.color;
			c.shadowColor = _this.color;
			c.shadowBlur = 50;
			c.fill();
			c.closePath();
		};
	};
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map