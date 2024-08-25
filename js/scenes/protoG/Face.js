function compCol(c1, c2) {
	return red(c1) === red(c2) &&
		green(c1) === green(c2) &&
		blue(c1) === blue(c2)
}

function drawFace() {
	
	cbpush(function(x, y, col, it) {
		let ocol = color("black");

		if (brightness(getPixel(x, y + 1, ocol)) < 50)
			setPixel(x, y + 1, "white", it);
		if (brightness(getPixel(x, y - 1, ocol)) < 50)
			setPixel(x, y - 1, "white", it);
		if (brightness(getPixel(x + 1, y, ocol)) < 50)
			setPixel(x + 1, y, "white", it);
		if (brightness(getPixel(x - 1, y, ocol)) < 50)
			setPixel(x - 1, y, "white", it);
		return col
	})
	cbpush(cbSinR)
	cbpush(glitch2)

	cbpush(mirror);



	cbpush(function(x, y, col, it) {
		let oc = color(red(col), green(col), blue(col));
		for (let i = 1; i < 5; i++) {
			oc.setRed(red(oc) + 50);
			oc.setGreen(green(oc) + 50);
			oc.setBlue(blue(oc) + 50);
			setPixel(x, y + i, oc, it)
		}
		return col
	})

	cbpush(function(x, y, col) {
		return color('hsb(' + floor((x / (64 + 64 + 32) * 360 * 2)) + ',100%,100%)')
	})



	pixelModeLong = true

	let col = color("blue");
	drawLine(64 + 16, 20, 64, 16, col);
	drawLine(64, 16, 64 - 64 / 3, 20, col);
	drawLine(64 - 64 / 3, 20, 64 / 2, 16, col);

	drawCircle(64 / 4, 7, 6, col)
	drawLine(64 + 2, -2, 64 + 4 + 2, 4, col)

	//setPixel(64 + 10, -20);

	pixelModeLong = false
	cbpop(6)
}















//