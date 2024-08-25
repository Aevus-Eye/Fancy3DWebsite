let nsstars = [];

function nsSetup() {
	while( nsstars.length < 10) {
		nsstars.push({
			x: random(64 + 1, 64 + 32 - 1),
			y: random(-64 + 1, 0 - 1),
			to: random(2 * PI)
		})
		//moon pos and radius 64 + 16, -40, 11,
		if(sqd(nsstars[nsstars.length-1].x-64-16,nsstars[nsstars.length-1].y+40)<12*12){ //is the star to close to the moon?
			nsstars.pop();//get another one
		}
	}
}

function drawNightSky(t) {
	pixelModeLong = true;
	//cbpush(maxc)

	t /= 4
	t += 20
	cbpush(filldownsb)
	for (let i = 0; i < 5; i++) {
		drawCloudLayer(t, map(i, 0, 4, 1, 5), /*map(i,0,4,5,15)*/ 14, map(i, 0, 4, 29, -5), map(i, 0, 4, 50, 200));
	}
	cbpop()

	cbpush(function(x, y, col, it) {
		let c = getPixel(x, y);
		if (sqd(x - 64 - 16 - 6 - 2, y + 40 + 5) < 13 * 13)
			//if(sqd(x-64-16+sin(t*6)*7,y+40+cos(t*6)*7)<13*13)
			return;
		return 200 - red(c)
	})
	drawFilledCircle(64 + 16, -40, 11, 200)
	cbpop()

	cbpush(additive)
	for (let i = 0; i < nsstars.length; i++) {
		let c = 200 * (sin(t * 10 + nsstars[i].to) );
		setPixel(nsstars[i].x, nsstars[i].y, max(c , 0))
		setPixel(nsstars[i].x + 1, nsstars[i].y, max(c - 60, 0))
		setPixel(nsstars[i].x - 1, nsstars[i].y, max(c - 60, 0))
		setPixel(nsstars[i].x, nsstars[i].y + 1, max(c - 60, 0))
		setPixel(nsstars[i].x, nsstars[i].y - 1, max(c - 60, 0))
	}
	cbpop()

	pixelModeLong = false;
}

function sqd(x, y) {
	return x * x + y * y
}

function drawCloudLayer(t, ts, height, yoff, col) {
	for (let x = 0; x < 64 + 64 + 32; x++) {
		let h = smoothNoise(x / 20 + t * ts) / 255 * height;
		h += smoothNoise(x / 10 + t * ts + 30.5) / 255 * height / 2;

		setPixel(x, 31 - (yoff + h), col)
	}
}

function filldownsb(x, y, col, it) {
	while (y < 32) {
		setPixel(x, y, col, it);
		y++;
		col -= 2;
	}
}

function smoothNoise(t) {
	let f = fract(t);
	let i = ~~t
	return lerp(qhash4(i - 1), qhash4(i), easeInOutQuad(f))
}

function qhash1(int) { //bad rng
	return (int * 433) & 255
}

function qhash2(x) {
	x = ((x >> 16) ^ x) * 0x45d9f3b;
	x = ((x >> 16) ^ x) * 0x45d9f3b;
	x = (x >> 16) ^ x;
	return x & 255;
}

function qhash3(x) {
	x = ((x >> 16) ^ x) * 0x45d9f3b;
	x = (x >> 16) ^ x;
	return x & 255;
}

function qhash4(x) {
	x = x * 0x9f3b;
	x = (x >> 8) ^ x;
	return x & 255;
}

function easeInOutQuad(x) {
	return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
}