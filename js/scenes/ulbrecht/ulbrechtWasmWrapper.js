

// can contain an "Env" parameter, which is used to pass js functions into c 
// see: https://rob-blackbourn.github.io/blog/webassembly/wasm/array/arrays/javascript/c/2020/06/07/wasm-arrays.html
let importObject = {
	env: {
	//	AE_LogTextLength: length => console.log("text length: " + length),
	//	AE_TextDebug: (index, total, char) => console.log(`index ${index} total ${total} char ${char}`),
	}
};

async function AE_GetWasmExports() {
	// note: fetch does not work with relative paths...
	let wasmFile = await fetch("js/scenes/ulbrecht/ulbrecht.wasm");
	let buffer = await wasmFile.arrayBuffer();
	//console.log(wasmFile, buffer);
	let module = await WebAssembly.instantiate(buffer, importObject);
	return module.instance.exports;
}

export default class Ulbrecht {
	_memory;
	_exports;
	_doneInitialising = false;

	async Init() {
		let exports = await AE_GetWasmExports();
		this._exports = exports;
		// todo: figure out a better way than just random offset of 40k bytes...
		// but for whatever reason if i create the buffer in c++, everything goes wrong.
		// maybe its taking up too much memory and has a stack overflow?
		// idk, its weird and doesent work, but this random 40k offset does, so whatever, dont touch it.
		const array = new Uint8Array(exports.memory.buffer, 40_000, 128 * 32);
		this._memory = array;

		exports.AE_InitMain(array.byteOffset);
		this._doneInitialising = true;
	}

	/**
	 * 
	 * @param {boolean[]} buttons - an array of 5 booleans. each represents 1 button on ulbrecht. 
	 * true means button is pressed, false means its not pressed. 
	 */
	Update(buttons) {
		this._ThrowIfNotDoneInitializing();

		if (!Array.isArray(buttons) || buttons.length != 5) {
			console.warn("not all buttons specified for ulbrecht. expected bool[5], got " + buttons);
			buttons = [false, false, false, false, false];
		}

		this._exports.AE_Main(...buttons);
	}

	IsDoneInitalizing() {
		return this._doneInitialising;
	}

	_ThrowIfNotDoneInitializing(){
		if (!this.IsDoneInitalizing())
			throw "not done initalizing!";
	}

	GetMatrixMemory() {
		this._ThrowIfNotDoneInitializing();
		return this._memory;
	}

}







// console.log("js loaded");


// // can contain an "Env" parameter, which is used to pass js functions into c 
// // see: https://rob-blackbourn.github.io/blog/webassembly/wasm/array/arrays/javascript/c/2020/06/07/wasm-arrays.html
// let importObject = {
// 	//env: {
// 	//	AE_LogTextLength: length => console.log("text length: " + length),
// 	//	AE_TextDebug: (index, total, char) => console.log(`index ${index} total ${total} char ${char}`),
// 	//}
// };


// async function GetWasmExports() {
// 	let wasmFile = await fetch("wasm/ulbrecht.wasm")
// 	let buffer = await wasmFile.arrayBuffer();
// 	let module = await WebAssembly.instantiate(buffer, importObject);
// 	return module.instance.exports;
// }

// function setPixel(data, i, col) {
// 	data[i * 4 + 0] = col & 4 ? 255 : 0;
// 	data[i * 4 + 1] = col & 2 ? 255 : 0;
// 	data[i * 4 + 2] = col & 1 ? 255 : 0;
// 	data[i * 4 + 3] = 255;
// }

// function drawMatrixBuffer(array) {
// 	let canvas = document.getElementById("canvas");
// 	let ctx = canvas.getContext("2d");
// 	let imgData = ctx.getImageData(0, 0, 128, 32);
// 	let data = imgData.data;
// 	for (let i = 0; i < 128 * 64; i++) {
// 		setPixel(data, i, array[i]);
// 	}
// 	ctx.putImageData(imgData, 0, 0);
// }

// function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
// 	ctx.beginPath()
// 	ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
// 	if (fill) {
// 		ctx.fillStyle = fill
// 		ctx.fill()
// 	}
// 	if (stroke) {
// 		ctx.lineWidth = strokeWidth
// 		ctx.strokeStyle = stroke
// 		ctx.stroke()
// 	}
// }

// let colorTable;

// function Color_tToColor(col) {
// 	if (!colorTable) {
// 		colorTable = [];
// 		for (let c = 0; c < 8; c++) {
// 			colorTable[c] = `#${c & 4 ? 'F' : '0'}${c & 2 ? 'F' : '0'}${c & 1 ? 'F' : '0'}`;
// 		}
// 	}
// 	return colorTable[col];
// }

// function DrawMatrixFancy(array, ctx) {
// 	for (let i = 0, length = array.length; i < length; i++) {
// 		let x = i % 128;
// 		let y = Math.floor(i / 128);
// 		drawCircle(ctx, 5 + x * 10, 5 + y * 10, 5, Color_tToColor(array[i]));
// 	}
// }

// function DrawMatrixFancyFast(array, ctx) {
// 	for (let col = 0; col < 8; col++) {
// 		ctx.beginPath()
// 		for (let i = 0, length = array.length; i < length; i++) {
// 			let color = array[i];
// 			if (color != col)
// 				continue;

// 			let x = i % 128;
// 			let y = Math.floor(i / 128);

// 			let rx = 5 + 10 * x;
// 			let ry = 5 + 10 * y;
// 			ctx.moveTo(rx, ry)
// 			ctx.arc(rx, ry, 5, 0, 2 * Math.PI, false)
// 		}
// 		ctx.fillStyle = Color_tToColor(col);
// 		ctx.fill()
// 	}
// }


// function sleep(ms) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
// }

// let keyboardState = [false, false, false, false, false];

// window.addEventListener("keydown", function (event) {
// 	if (event.defaultPrevented) {
// 		return; // Do nothing if the event was already processed
// 	}
// 	HandleKeys(event.key, true);

// 	// Cancel the default action to avoid it being handled twice
// 	event.preventDefault();
// }, true);

// window.addEventListener("keyup", function (event) {
// 	if (event.defaultPrevented) {
// 		return; // Do nothing if the event was already processed
// 	}
// 	HandleKeys(event.key, false);

// 	// Cancel the default action to avoid it being handled twice
// 	event.preventDefault();
// }, true);
// // the last option dispatches the event to the listener first,
// // then dispatches event to window

// function HandleKeys(keycode, pressed) {
// 	switch (keycode) {
// 		case "ArrowDown":
// 			keyboardState[0] = pressed;
// 			// code for "down arrow" key press.
// 			break;
// 		case "ArrowUp":
// 			keyboardState[1] = pressed;
// 			// code for "up arrow" key press.
// 			break;
// 		case "ArrowLeft":
// 			keyboardState[2] = pressed;
// 			// code for "left arrow" key press.
// 			break;
// 		case "ArrowRight":
// 			keyboardState[3] = pressed;
// 			// code for "right arrow" key press.
// 			break;
// 		case " ":
// 			keyboardState[4] = pressed;
// 			break;
// 	}
// }

// async function test() {
// 	let exports = await GetWasmExports();

// 	console.log("calling main...");
// 	// todo: figure out a better way than just random offset of 20k bytes...
// 	const array = new Uint8Array(exports.memory.buffer, 40_000, 128 * 32);

// 	exports.AE_InitMain(array.byteOffset);
// 	let canvas = document.getElementById("canvas");
// 	let ctx = canvas.getContext("2d");
// 	//drawMatrixBuffer(array);
// 	return;
// 	while (true) {
// 		await sleep(1000);
// 		//console.log("keys: " + keyboardState.join(", "));
// 		console.time("webm Call");
// 		exports.AE_Main(...keyboardState);
// 		console.timeEnd("webm Call");
// 		//drawMatrixBuffer(array);
// 		console.time("Draw matrix");
// 		DrawMatrixFancyFast(array, ctx);
// 		console.timeEnd("Draw matrix");
// 		// console.log(colorTable);
// 		// console.log(array.join(", "));
// 		// exports.MainT(array.byteOffset);
// 		// console.log(array.join(", "));
// 	}






// 	// let result = exports.add(1, 2);
// 	// console.log(`1 + 2 = ${result}`);

// 	// for (let i = 0; i < 10; i++)
// 	// 	console.log("counter = " + exports.counter());

// 	// let arrayPtr = exports.FillInitalArray();
// 	// console.log(arrayPtr);

// 	// const array = new Uint8Array(exports.memory.buffer, 0, 100);
// 	// exports.SetArray(array.byteOffset, array.length);
// 	// console.log(array.join(", "));
// }

// test();


