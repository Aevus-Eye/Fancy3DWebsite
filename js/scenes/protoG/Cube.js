let cubeVerts;
let cubeEdges;
let vertBuf;

function setupCube() {
	cubeVerts = //[createVector(-1, -1, -1), createVector(-1, -1, 1), createVector(-1, 1, -1), createVector(-1, 1, 1), createVector(1, -1, -1), createVector(1, -1, 1), createVector(1, 1, -1), createVector(1, 1, 1)]
		[
			createVector(-3, -1, -1), createVector(3, -1, -1), //1
			createVector(-3, 1, -1), createVector(-1, 1, -1), createVector(1, 1, -1), createVector(3, 1, -1), //5
			createVector(-1, 3, -1), createVector(1, 3, -1), //7

			createVector(-3, -1, 1), createVector(3, -1, 1), //9
			createVector(-3, 1, 1), createVector(-1, 1, 1), createVector(1, 1, 1), createVector(3, 1, 1), //13
			createVector(-1, 3, 1), createVector(1, 3, 1), //15
			/*(-3,-1,-1),(3,-1,-1),//1
	    (-3,1,-1),(-1,1,-1),(1,1,-1),(3,1,-1),//5
	              (-1,3,-1),(1,3,-1),//7
		
		(-3,-1,1),(3,-1,1),//9
	    (-3,1,1),(-1,1,1),(1,1,1),(3,1,1),//13
	             (-1,3,1),(1,3,1),//15
				  */
		]

	cubeEdges = [
		[0, 1],
		[1, 5],
		[5, 4],
		[4, 7],
		[7, 6],
		[6, 3],
		[3, 2],
		[2, 0],

		[0 + 8, 1 + 8],
		[1 + 8, 5 + 8],
		[5 + 8, 4 + 8],
		[4 + 8, 7 + 8],
		[7 + 8, 6 + 8],
		[6 + 8, 3 + 8],
		[3 + 8, 2 + 8],
		[2 + 8, 0 + 8],

		[0, 8],
		[1, 9],
		[2, 10],
		[3, 11],
		[4, 12],
		[5, 13],
		[6, 14],
		[7, 15],
	]
	/* [
		[0, 1],
		[0, 2],
		[0, 4],
		[7, 5],
		[7, 6],
		[7, 3],
		[6, 2],
		[6, 4],
		[5, 4],
		[5, 1],
		[3, 1],
		[3, 2],
	];*/


}

//side: 0 means top, 1 means front, 2 means on both sides
function drawCube(t, side) {
	vertBuf = []
	for (let i = 0; i < cubeVerts.length; i++)
		vertBuf.push(createVector(cubeVerts[i].x, cubeVerts[i].y, cubeVerts[i].z))
	//vertBuf = [...cubeVerts];
	rotx(t * 0.9273846)
	roty(t)
	rotz(t * 1.0826193)
	perspectiveT()

	const s = map(sin(t), -1, 1, 4, 9) //8
	//for(let f=0;f<4;f++){
	//cbpush(onlyFaceCenter.bind(null,1))
	if (side===0) {
		pixelModeLong = true
		cbpush(offset.bind(null, 64 + 16, 16))
	} else if(side===1){
		cbpush(bigFaceCenterCut) //current
	}
	else{
		pixelModeLong = true
		cbpush(mirror)
		cbpush(offset.bind(null, 32, 16))
	}
	
	/*cbpush(function (x,y,col,it){
		setPixel(x,y,col,it);
		col=color(col)
		col.setAlpha(120);
		setPixel(x+1,y,col,it);
		//setPixel(x-1,y,col,it);
		//setPixel(x,y+1,col,it);
		//setPixel(x,y-1,col,it);
	})*/
	for (let i = 0; i < cubeEdges.length; i++) {
		drawLine(vertBuf[cubeEdges[i][0]].x * s, vertBuf[cubeEdges[i][0]].y * s, vertBuf[cubeEdges[i][1]].x * s, vertBuf[cubeEdges[i][1]].y * s, "magenta");
	}
	cbpop(2)
	//}
	pixelModeLong = false
}

function rotx(angle) {
	for (let i = 0; i < vertBuf.length; i++) {
		let temp = vertBuf[i].y;
		vertBuf[i].x = vertBuf[i].x;
		vertBuf[i].y = vertBuf[i].y * cos(angle) - vertBuf[i].z * sin(angle);
		vertBuf[i].z = temp * sin(angle) + vertBuf[i].z * cos(angle);
	}
}

function roty(angle) {
	for (let i = 0; i < vertBuf.length; i++) {
		let temp = vertBuf[i].x;
		vertBuf[i].x = vertBuf[i].z * sin(angle) + vertBuf[i].x * cos(angle);
		vertBuf[i].y = vertBuf[i].y;
		vertBuf[i].z = vertBuf[i].z * cos(angle) - temp * sin(angle);
	}
}

function rotz(angle) {
	for (let i = 0; i < vertBuf.length; i++) {
		let temp = vertBuf[i].x;
		vertBuf[i].x = vertBuf[i].x * cos(angle) - vertBuf[i].y * sin(angle);
		vertBuf[i].y = temp * sin(angle) + vertBuf[i].y * cos(angle);
		vertBuf[i].z = vertBuf[i].z;
	}
}

function perspectiveT() {
	let back = -11 //-10/2
	for (let i = 0; i < vertBuf.length; i++) {
		let d = map(vertBuf[i].z, 0, back, 1, 0)
		vertBuf[i].x *= d
		vertBuf[i].y *= d
	}
}
























//