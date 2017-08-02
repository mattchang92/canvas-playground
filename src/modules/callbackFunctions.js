import config from '../../config.json';

export default (data, canvas, ctors) => {
	const addBall = () => {
		data.circles.push(new Circle(100,100,80, 'blue'));
	}

	const createAtom = () => {
		const Atom = ctors.atom;
		if (!data.atom) {
			data.atom = new Atom(canvas.width/2, canvas.height/2, 15, '#1AA4D1')
		} else {
			data.atom = null;
		}
	}

	const startRainingOrbs = () => {
		data.rainOrbs = !data.rainOrbs;
	}

	const startBubbles = () => {
		data.makeBubbles = !data.makeBubbles;
	}

	const startVisualizer = () => {
		const Bar = ctors.bar;
		if (!data.visualizer.length) {
			for (let i = 0; i < 16; i++) {
				data.visualizer.push(new Bar(i * (canvas.width/16), canvas.height, canvas.width/16, 'red'));
			}
		} else {
			data.visualizer = [];
		}
	}

	const toggleColor = () => {
		if (data.visualizer.length) {
			data.visualizer.forEach((bar) => (bar.toggleColor(data)));
		}
	};

	const clearCanvas = () => {
		data.circles = [];
		data.visualizer = [];
		data.atom = null;
		data.makeBubbles = false;
		data.rainOrbs = false;
	}

	const stopAnimation = () => {
		if (data.animation) {
			cancelAnimationFrame(data.animation);
			data.animation = undefined;
		}
	}

	const restartAnimation = () => {
		if (!data.animation) animate(data);
	}

	const authenticateSpotify = () => {
		const redirectUri = window.location.href.includes('localhost') ?
		config.spotify.redirectUriClient.local : config.spotify.redirectUriClient.aws;

		window.location.href = config.spotify.authUrl + '/?client_id=' + config.spotify.clientID +
		'&response_type=token&redirect_uri=' + redirectUri + '&show_dialog=true',
		'GET'
	}

	return (
		{
			addBall,
			createAtom,
			startRainingOrbs,
			startBubbles,
			startVisualizer,
			toggleColor,
			clearCanvas,
			authenticateSpotify,
		}
	)

}
