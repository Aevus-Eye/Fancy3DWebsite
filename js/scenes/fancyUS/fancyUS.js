import AE_SceneBase from "../AE_SceneBase.js";
import * as THREE from "../../threejs/three.module.js";
import aeg from "../../globals.js";


export default class FancyUSScene extends AE_SceneBase {
	div = document.getElementById("FancyUSScene");
	modeSlider=document.getElementById("fusSelector");
	scene;

	Setup() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('#2C211B');

		let sphere = new THREE.Mesh( new THREE.SphereGeometry( 2, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
        this.scene.add(sphere);
	}

	Activate() {
		aeg.camera.position.set(0, 0, 2);
		aeg.camera.lookAt(0, 0, 0);

		this.div.style.display = "block";
	}

	Deactivate() {
		this.div.style.display = "none";
	}

	Update() {
		
		aeg.renderer.render(this.scene, aeg.camera);
	}
}


