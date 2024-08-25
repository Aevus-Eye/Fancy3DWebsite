import aeg from "../../globals.js";
import AE_SceneBase from "../AE_SceneBase.js";
import * as THREE from "../../threejs/three.module.js";
import { OrbitControls } from "../../threejs/OrbitControls.js";


export default class MainScene extends AE_SceneBase {
	scene;
	controls;
	div = document.getElementById("MainScene");

	Setup() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('#1C1B22');

		this.controls = new OrbitControls(aeg.camera, aeg.canvas);
		this.controls.update();
		//this.controls.addEventListener('change', requestRenderIfNotRequested);

		const pointLight1 = new THREE.PointLight(0xffffff);
		pointLight1.position.set(500, 500, 500);
		this.scene.add(pointLight1);

		const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
		pointLight2.position.set(- 500, - 500, - 500);
		this.scene.add(pointLight2);

		//let sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
		//aeg.mainScene.add( sphere );
		let sphere2 = new THREE.Mesh(new THREE.SphereGeometry(10, 20, 10), new THREE.MeshPhongMaterial({ flatShading: true }));
		sphere2.position.set(0, 0, 0);
		this.scene.add(sphere2);
	}


	Activate() {
		this.div.style.display = "block";
		// throw "method not overriden!"
		aeg.camera.position.set(50, 0, 0); //todo: this
		this.controls.target.set(0, 0, 0); //todo: this
		this.controls.update();
	}


	Deactivate() {
		this.div.style.display = "none";
		// throw "method not overriden!"
	}

	Update() {
		//this.controls.update();
		aeg.renderer.render(this.scene, aeg.camera);
	}
}

