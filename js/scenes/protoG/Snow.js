//snow
//frameRate dependant

let snowlh
let snp = [];

function initSnow() {
	snowlh = Array(64 + 64 + 32).fill(0);
	for (let i = 0; i < 80; i++) {
		snp[i] = {
			x: random(64 + 64 + 32),
			y: random(32)
		};
	}
}

function snaddpx(x) {

	if (snowlh[x] > snowlh[mod(x + 1, 64 + 64 + 32)]) {
		snowlh[mod(x + 1, 64 + 64 + 32)]++;
	} else if (snowlh[x] > snowlh[mod(x - 1, 64 + 64 + 32)]) {
		snowlh[mod(x - 1, 64 + 64 + 32)]++;
	} else
		snowlh[x]++;
}

function snowParticles() {
	for (let i = 0; i < snp.length; i++) {
		snp[i].y--;
		snp[i].x = mod(snp[i].x + sin(frame / 10 + i / snp.length * 30) * 2, 64 + 64 + 32);

		if (snp[i].y < 0) {
			snaddpx(floor(snp[i].x));
			snp[i] = {
				x: random(64 + 64 + 32),
				y: random(32, 32 + 25)
			}
		}

		setPixel(snp[i].x, 31 - snp[i].y, "white");
	}
}

function snowFloor() {
	for (let i = 0; i < snowlh.length; i++) {
		for (let h = 0; h < snowlh[i]; h++) {
			setPixel(i, 31 - h, "white");
		}
	}
}

function splow(x) {
	x = floor(x)
	drawRect(x, 17, 1, 15, "yellow");
	cbpush(function(x, y, col, it) {
		for (let i = y; i < 32; i++)
			setPixel(x, i, col, it);
		return col
	})
	drawLine(x + 1, 23, x + 17, 31, "white");
	cbpop()
	if (x >= 0 && x < 64 + 64 + 32)
		snowlh[x] = 0;
}

function drawSnow() {
	pixelModeLong = true

	snowParticles();
	snowFloor();
	splow(mod(frame, 200 * 2) - 15)

	pixelModeLong = false
}

function mod(n, m) {
	return ((n % m) + m) % m;
}








//