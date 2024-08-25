
function drawGravitas(time) {
	//return
	for (let x = 0; x < mW; x++) {
		for (let y = 0; y < mH * 3; y++) {
			drawGravitasPixel(x, y,time);
		}
	}
	for (let x = 0; x < 32; x++) {
		for (let y = 0; y < 32; y++) {
			drawGravitasPixel(x + 64, y + 32,time);
		}
	}
}

function drawGravitasPixel(x, y,time) {
	let nx = x - 48;
	let ny = y - 16 - 32 + 0.5;
	//rings 
	let l = sqrt(nx * nx + ny * ny)
	let a = atan2(nx, ny) + time;
	let s = fract(cos(a * 16) * 0.1 + l / 10 - time * 3);
	//circle in the center
	let pulse = (sin(time * 3.1415 * 2.0 * 3 + 1.8) + 1.0) * 2.5 + 4;
	let ad = max(min(pulse - l, 0.5), 0);
	ad = ad * 0.3;
	//combine the 2 
	let str = 'hsl(280,100%,' + ((s * min((l - 3) * 0.04, 1) + ad) * 100) + '%)';
	//let str = 'hsl(280,100%, ${ ((s * min((l - 3) * 0.04, 1) + ad) * 100) }%)';
	//print (str)
	setPixel(x, y, color(str)); //${(s * min((l - 3) * 0.04, 1) + ad)}
}















//