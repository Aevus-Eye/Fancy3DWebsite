let fonts;

function drawChar(x, y, char, col, font) {
	//text( /*String.fromCharCode(char)*/ char, x, y)
	//get the width in pixels
	let pixelWidth = font.glyph_dsc[char - font.unicode_first].w_px;
	//get how many bytes this character takes
	let withInBytes = ~~(pixelWidth / 8) + ((pixelWidth % 8) != 0);
	let xp = 0;
	//go from left to right in steps of 8 pixels
	for (; pixelWidth > 0; pixelWidth -= 8) {
		//go from top to bottom
		for (let yp = 0; yp < font.h_px; yp++) {
			//get 1 byte of bitmap data from flash
			let data = font.glyph_bitmap[font.glyph_dsc[char - font.unicode_first].glyph_index + xp + yp * withInBytes];
			//go through that byte of data from left to right
			for (let rx = 0; rx < pixelWidth && rx < 8; rx++) {
				//if there is a pixel draw that pixel
				if (data & (1 << (7 - rx))) {
					setPixel(x + rx + xp * 8, y + yp, col);
				}
			}
		}
		xp++;
	}
}

/*function drawText(x, y, text, col, font) {
	let off = 0
	let char = 0;
	for (let i = 0; char = text.charCodeAt(i), !isNaN(char); i++) {
		//char=text.charCodeAt(i);
		drawChar(x + off, y, char, col, font)
		off += 10;
	}

}*/


function drawText(x, y, str, color, font) {
	//Color_t startColor = color;
	let char;
	let xStart = x;
	for (let i = 0; char = str.charCodeAt(i), !isNaN(char); i++) {
		switch (char) {
			case 1: //is the current character a special space?
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				x += char; //add that space
				break;

			case '\b'.charCodeAt(): //is the current character a -1 space?
				x--;
				break;

			case '\n'.charCodeAt(): //is the current character a new line?
				//go back to the start of the line and move down by the font height
				x = xStart;
				y += font.h_px;
				break;

			case ' ': //is the current character a space?
				x += font.space_width;
				break;

			default:
				//is the character not supported by the font?
				if (char < font.unicode_first || char > font.unicode_last) {
					x += font.space_width; //treat is like a space
				}
				//is this a normal character that can be drawn to the Display?
				else {
					//draw the current character to the Display
					drawChar(x, y, char, color, font);

					//add the width of the character and one <spaceBetweenChars>
					x += font.glyph_dsc[char - font.unicode_first].w_px + font.space_between_chars;
				}
				break;

				/*case '\a'://is the current character "change color"?
				//get the color from the string and use that color,
				//except if the color is 255, then use the starting color
				i++;
				if (str[i] == 0xff)
				{
					color = startColor;
				}
				else
				{
					color = str[i];
				}
				break;*/
		} //end switch
	}
}


