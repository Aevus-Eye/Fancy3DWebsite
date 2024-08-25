let curCoin = 0;
let coinFlipTime = 3
const maxCoinHeight = -64
let spins = 20;

//let coinHeight = 16;

function startCoinFlip() {
	spins = ~~random(10, 16);
	coinFlipTime = 0;
	curCoin = spins % 2;
}

function drawCoinFlip(deltaTime) {
	pixelModeLong = true;

	if (coinFlipTime > 2) {
		drawImage(64, 0, curCoin ? imgCoinTail : imgCoinHead);
	} else if (coinFlipTime > 1) {
		drawCoinShineAndStop(curCoin, coinFlipTime - 1)
		coinFlipTime += deltaTime/2;
	} else {
		drawCoinSpin(spins * coinFlipTime, (-4 * (coinFlipTime - 0.5) * (coinFlipTime - 0.5) + 1) * maxCoinHeight);
		coinFlipTime += deltaTime * 0.1;
	}

	pixelModeLong = false;
}

//rot = rotation cycle. 0 .. 2 rep. 0.0 is heads, 0.5 is side, 1.0 is tails, 1.5 is side, 2.0 is heads
function drawCoinSpin(rot, height) {
	//let img=
	rot += 0.5;
	let tim = rot * 2 % 2;

	cbpush(bindSquishV(tim > 1 ? 2 - tim : tim, 16 + height))
	cbpush(darkenBack.bind(null, height, tim))
	drawImage(64, height, rot * 2 % 4 < 2 ? imgCoinHead : imgCoinTail);
	cbpop(2)
}

//cp 0..1 for circle, <0 for nothing
function drawCoinShineAndStop(coinSide, cp) {
	cbpush(shine.bind(null, cp))
	drawImage(64, 0, coinSide ? imgCoinTail : imgCoinHead);
	cbpop();
}

function shine(t, x, y, col) {
	t = t * 400 - 10
	ds = (x - 64 - 15.5) * (x - 64 - 15.5) + (y - 15.5) * (y - 15.5);

	let ad = -(ds - t) * (ds - t) + 1600
	ad *= 0.1

	if (ad < 0)
		ad = 0;
	return color(red(col) + ad, green(col) + ad, blue(col) + ad, alpha(col));
}

function darkenBack(center, t, x, y, col) {
	y -= center;
	//let t = time2 % 2;
	if (t > 1 /*&&y>=16*/ ) {
		t = 2 - t;
		let d = (y - 16) / 16;
		let a = d * (1 - t);
		a = 1 - a;

		return color(red(col) * a, green(col) * a, blue(col) * a, alpha(col));
	} else if (t < 1 /*&&y<16*/ ) {
		let d = (16 - y) / 16;
		let a = d * (1 - t);
		a = 1 - a;

		return color(red(col) * a, green(col) * a, blue(col) * a, alpha(col));
	}
	return col
}




















//