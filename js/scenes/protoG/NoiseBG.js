function drawNoiseBG(r,g,b,a,s,time) {
	let col = color(r, g, b);
	for (let x = 0; x < 64; x++) {
		for (let y = 0; y < 32 * 3; y++) {
			col.setAlpha(noise(x / s, y / s, time  / s) * a)
			setPixel(x, y, col)
		}
	}
	for (let x = 64; x < 64 + 32; x++) {
		for (let y = 32; y < 32 * 2; y++) {
			col.setAlpha(noise(x / s, y / s, time  / s) * a)
			setPixel(x, y, col)
		}
	}
}