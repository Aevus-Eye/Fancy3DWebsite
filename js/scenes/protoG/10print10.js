let tpts = 4;

function drawtpt(t) {
	tpts = constrain(floor(mouseX / 100), 1, 8)+1
	let o1 = mouseY < height / 2 ? 0 : 1;


	for (let x = 0; x < 64; x += tpts + o1)
		for (let y = 0; y < 64 + 32; y += tpts + o1) {
			if (o1 == 1)
				setPixel(x - 1, y - 1, "cyan");

			let v = noise(x, y, t)

			if (v < 0.5)
				for (let i = 0; i < tpts; i++)
					setPixel(x + i, y + i, "cyan");
			else
				for (let i = 0; i < tpts; i++)
					setPixel(x + (tpts - 1 - i), y + i, "cyan");

		}
}