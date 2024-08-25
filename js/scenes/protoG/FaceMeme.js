function drawFaceMeme() {
	pixelModeLong = true;
	drawImage(32 - imgEye[0].length / 2, 0, imgEye);
	drawImage(64, 8, imgMouth);
	drawImage(64 + 32 + 32 - imgEye[0].length / 2, 0, imgEye);
	pixelModeLong = false;
}