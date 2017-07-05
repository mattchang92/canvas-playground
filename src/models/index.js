import Atom from './atom';
import Bar from './bar';
import Bubble from './bubble';
import Circle from './circle';
import FallingOrb from './fallingOrb';
import OrbitParticles from './OrbitParticles';
import Spark from './spark';

export default (canvas, context, mouse) => ({
	atom: Atom(canvas, context),
	bar: Bar(canvas, context),
	bubble: Bubble(canvas, context, mouse),
	circle: Circle(canvas, context, mouse),
	fallingOrb: FallingOrb(canvas, context),
	orbitParticles: OrbitParticles(canvas, context),
	spark: Spark(canvas, context),
})
