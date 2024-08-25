import * as THREE from "./threejs/three.module.js";
import aeg from "./globals.js";

window.addEventListener('load', Start);
//window.addEventListener("resize", resizeEvent);


function Start() {
	console.log("start");

	aeg.canvas = document.getElementById("MainCanvas");
	aeg.renderer = new THREE.WebGLRenderer({ canvas: aeg.canvas });
	aeg.gl = aeg.renderer.getContext();
	//aeg.ctx = render.getContext();

	const fov = 75;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 1000;
	aeg.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	aeg.camera.position.set(50, 0, 0); //todo: this

	aeg.scenes.main.Setup();
	aeg.scenes.ulbrecht.Setup();
	aeg.scenes.mocca.Setup();
	aeg.scenes.shader.Setup();

	aeg.activeScene = aeg.scenes.main;
	aeg.activeScene.Activate();

	document.querySelectorAll(".ChangeSceneButton")
		.forEach(button => button.addEventListener("click",
			() => {
				console.log(button.value);
				ChangeScene(aeg.scenes[button.value])
			}
		));

	Render();
}

function ChangeScene(nextScene) {
	aeg.activeScene.Deactivate();
	aeg.activeScene = nextScene; //aeg.scenes.ulbrecht;
	aeg.activeScene.Activate();
}

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function Render() {
	requestAnimationFrame(Render);

	//todo: update aeg.time

	if (resizeRendererToDisplaySize(aeg.renderer)) {
		console.log("resizing...");

		const canvas = aeg.renderer.domElement;
		aeg.camera.aspect = canvas.clientWidth / canvas.clientHeight;
		aeg.camera.updateProjectionMatrix();
	}

	aeg.activeScene.Update();
}


