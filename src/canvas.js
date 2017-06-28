
// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const addNewBtn = document.getElementById('do-add-ball');
const addAtomBtn = document.getElementById('do-add-atom');
const makeBubblesBtn = document.getElementById('do-make-bubbles');
const makeOrbBtn = document.getElementById('do-make-orb');
const clearCanvasBtn = document.getElementById('do-clear-canvas');
const stopAnimationBtn = document.getElementById('do-stop-animation');
const restartAnimationBtn = document.getElementById('do-restart-animation');


canvas.width = innerWidth;
canvas.height = innerHeight * 0.975;


// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};
const Circle = require('./models/circle')(canvas, c, mouse);
const Atom = require('./models/atom')(canvas, c);
const Bubble = require('./models/bubble')(canvas, c, mouse);
const FallingOrb = require('./models/fallingOrb')(canvas, c);
const Spark = require('./models/spark')(canvas, c);

const colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#FF7F66'
];

const GRAVITY = 0.4;
const FRICTION = 0;
// const FRICTION = 0.1;


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
let animation;
let circle1;
let circle2;
let circles = [];
let atom;
let timer = 0;
let makeBubbles = false;
let rainOrbs = false;;
let bubbles = [];
let sparks = [];
let orbs = [];
// Implementation
function init() {
	addNewBtn.addEventListener('click', () => {
		circles.push(new Circle(100,100,80, 'blue'));
	})

	addAtomBtn.addEventListener('click', () => {
		// atom = new Atom(canvas.width/2, canvas.height/2, 15, '#FA942E')
		atom = new Atom(canvas.width/2, canvas.height/2, 15, '#1AA4D1')
		// atom = new Atom(canvas.width/2, canvas.height/2, 15, '#F2F3F4')
	})

	makeOrbBtn.addEventListener('click', () => {
		rainOrbs = true;
	})

	makeBubblesBtn.addEventListener('click', () => {
		makeBubbles = true;
	})

	clearCanvasBtn.addEventListener('click', () => {
		circles = [];
		atom = null;
		makeBubbles = false
		rainOrbs = false;
	})

	stopAnimationBtn.addEventListener('click', () => {
		if (animation) {
			cancelAnimationFrame(animation);
			animation = undefined;
		}
	})

	restartAnimationBtn.addEventListener('click', () => {
		if (!animation) {
			animate();
		}
	})

}

// Animation Loop
function animate() {
	timer++;
	animation = requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);
	// circle1.update();
	// circle2.followMouse(circle1);
	if (circles.length) {
		circles.forEach((circle) => {
			circle.update();
		});

		if (circles.length > 1) {
			for (let i = 0; i < circles.length - 1; i++) {
				for (let j = i + 1; j < circles.length; j++) {
					circles[i].detectCollision(circles[j]);
				}
			}
		}

		circles.forEach((circle) => {
			circle.collisionUpdated = false;
		})
	}

	if (atom) atom.update(timer * 0.7);

	if (makeBubbles) {
		const randColor = Math.floor(3 * Math.random());

		bubbles.push(new Bubble(50, randColor));
		bubbles.forEach((bubble) => {
			bubble.update();
			if (bubble.destroy()) {
				bubbles.shift();
			}
		})
	}

	if ((timer % 100 === 0 || timer % 75 === 0) && rainOrbs) {
		const x = Math.random() * canvas.width;
		const y = -200;
		const dx = 6 * Math.random() - 3;
		const radius = 10 * Math.random() + 10;

		orbs.push(new FallingOrb(x, y, dx, radius))
	}

	if (orbs.length) {
		orbs = orbs.filter((orb) => {
			return !orb.destroy();
		});

		orbs.forEach((orb) => {
			orb.update();
			if (orb.bounces) {
				orb.bounces--;
				const sparksNumber = 4 * Math.random() + 10;
				for (let i = 0; i < sparksNumber; i++) {
					const dx = 8 * Math.random() - 4;
					const dy = Math.random() * orb.dy;
					sparks.push(new Spark(orb.x, orb.y, dx, dy))
				}
			}
		})
	}

	if (sparks.length) {
		sparks = sparks.filter((spark) => {
			return !spark.isOnFloor();
		});

		sparks.forEach((spark) => {
			spark.update();
		})
	}


}

init();
animate();
