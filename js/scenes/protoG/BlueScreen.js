//fps dependant;

let bsPercent = 0;

function resetBS() {
	bsPercent = 0;
}

function drawBlueScreen(deltaTime) {
	if (bsPercent < 130) {
		bsPercent += deltaTime
		drawbs(bsPercent < 0 ? 0 : (~~bsPercent));
	} else if (bsPercent < 140) {
		bsPercent += deltaTime
	} else {
		cbpush(glitch2)
		drawbs("?\1?\1?\1")
		cbpop()

		sleep(100) //horrible hack to slow down the framerate
	}
}

function drawbs(percent) {
	let bgCol = color(1, 119, 215);
	
	drawRect(0, 0, 64, 32 * 3, bgCol);
	drawRect(64, 0, 32, 32, bgCol);

	cbpush(rot90CCW);
	drawText(10, 0, ":(", "white", fonts[1]);
	drawText(3, 17, "Your Proto ran into\na problem and needs\nto restart.", "white", fonts[2]);
	drawText(32 + 3, 64, percent+"%\ncomp\1-\nlete", "white", fonts[2])
	cbpop()
}

//busy wait
function sleep(miliseconds) {
	let end = millis() + miliseconds;
	while (millis() < end) {}
}








//