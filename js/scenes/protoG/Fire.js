//doom fire
//is framerate dependant

let firePixels;
const FIRE_WIDTH = 64 + 64 + 32
const FIRE_HEIGHT = 16 * 3;
const maxfv = 10;

function spreadFire(src) {
	var pixel = firePixels[src];
	if (pixel == 0) {
		firePixels[src - FIRE_WIDTH] = 0;
	} else {
		var randIdx = Math.round(Math.random() * 3.0); // & 3;
		var dst = src - randIdx + 1;
		firePixels[dst - FIRE_WIDTH] = pixel - (randIdx & 1);
	}
}

function drawFire() {
	for (x = 0; x < FIRE_WIDTH; x++) {
		for (y = 1; y < FIRE_HEIGHT; y++) {
			spreadFire(y * FIRE_WIDTH + x);
		}
	}
	//callback=additive;
	pixelModeLong = true;
	for (let i = 0; i < /*firePixels.length*/(64+64+32)*(32+16); i++) {
		let col = pickfcol(firePixels[i] / maxfv)
		setPixel(i % (64 + 64 + 32), floor(i / (64 + 64 + 32))-16, col/*+(floor(firePixels[i]/maxfv*0xff)).toString(16).padStart(2, "0")*/);//uncomment last part to mix with layer below
	}
	pixelModeLong = false;
	//callback=null
}

function initFire() {
	firePixels = Array(FIRE_WIDTH * FIRE_HEIGHT).fill(0);
	// Set bottom line to 37 (color white: 0xFF,0xFF,0xFF)
	for (var i = 0; i < FIRE_WIDTH; i++) {
		firePixels[(FIRE_HEIGHT - 1) * FIRE_WIDTH + i] = maxfv;
	}
}

function pickfcol(val) {
	return fireTable[floor(val * (fireTable.length - 1))];
}

fireTable = [
	'#000000',
	'#470000',
	'#750000',
	'#A30000',
	'#D20000',
	'#FC3D00',
	'#F5AF00',
	'#F2E900',
	'#F9FF9E',

	/*
	'#070707',
	'#1f0707',
	'#2f0f07',
	'#470f07',
	'#571707',
	'#671f07',
	'#771f07',
	'#8f2707',
	'#9f2f07',
	'#af3f07',
	'#bf4707',
	'#c74707',
	'#DF4F07',
	'#DF5707',
	'#DF5707',
	'#D75F07',
	'#D7670F',
	'#cf6f0f',
	'#cf770f',
	'#cf7f0f',
	'#CF8717',
	'#C78717',
	'#C78F17',
	'#C7971F',
	'#BF9F1F',
	'#BF9F1F',
	'#BFA727',
	'#BFA727',
	'#BFAF2F',
	'#B7AF2F',
	'#B7B72F',
	'#B7B737',
	'#CFCF6F',
	'#DFDF9F',
	'#EFEFC7',
	'#FFFFFF',*/
]

/*
let fb;
const maxfv = 14;

function initFire(){
	fb=Array(64*40).fill(0);
	fb.fill(maxfv,0,64);
}

function drawFire(){
	for(let i=fb.length-1;i>=64;i--){
		let sub=random()>0.5?0:1;
		let off=floor(random(0,2));
		fb[i]=fb[i-64+off]-sub;
	}
	
	for(let i=0;i<fb.length;i++){
		setPixel(i%64,64+31-floor(i/64),fb[i]/maxfv*255);
	}
}
*/