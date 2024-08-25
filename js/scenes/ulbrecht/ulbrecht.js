import Ulbrecht from "./ulbrechtWasmWrapper.js";
import AE_SceneBase from "../AE_SceneBase.js";
import * as THREE from "../../threejs/three.module.js";
import aeg from "../../globals.js";

function MakeMaterial(buffer) {

	const ae_texture = new THREE.DataTexture(buffer, 128, 32, THREE.RedFormat, THREE.UnsignedByteType);

	const uniforms = {
		//dir: { value: dir },
		//matrixBuffer: { value: buffer },
		ae_tex: {
			type: "t",
			value: ae_texture,
		},
		//size:{value:0.10},
	};

	const vertexShader = `
	
	varying vec2 vUv;
	//varying vec3 vColor;
	//varying vec3 vNormal;
    
	void main()
	{
        vUv = vec2(uv.x*128.0,(1.0-uv.y)*32.0);
		//vColor = color;
		//vNormal=normal;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
	}
	`;

	const fragmentShader = `

	uniform sampler2D ae_tex;
	//uniform float size;
    
    varying vec2 vUv;
    
    void main(void) {
		uint col=uint(round(texelFetch(ae_tex, ivec2(vUv), 0).x*255.0));
		vec2 cir=vUv-floor(vUv)-0.5;
		vec3 baseColor=vec3((col>>2u)&1u,(col>>1u)&1u,(col)&1u);
		vec3 color=baseColor*smoothstep(0.30,0.07,cir.x*cir.x+cir.y*cir.y);

		gl_FragColor = vec4( color, 1.0 );
    }
	`;

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader,
		//vertexColors: true,
		fragmentShader,
		side: THREE.DoubleSide,
	});
	return { material, texture: ae_texture };
}

export default class UlbrechtScene extends AE_SceneBase {
	ulbrecht;
	matrixMemory;
	doUpdate = false;
	active = false;
	matrixTexture;
	buttonPressed = Array(5).fill(false);
	div = document.getElementById("UlbrechtScene");

	Setup() {
		[...document.getElementsByClassName("UlbrechtButton")].forEach(button => {
			button.onclick = () => {
				//console.log( button.value);
				this.buttonPressed[button.value] = true;
			}
		});
		document.addEventListener("keydown", (event) => {
			let map = { ArrowRight: 3, ArrowLeft: 2, ArrowDown: 0, ArrowUp: 1, Space: 4 };
			if (map[event.code] !== undefined) {
				this.buttonPressed[map[event.code]] = true;
			}
		});

		this.ulbrecht = new Ulbrecht();
		this.ulbrecht.Init()
			.then(() => {
				this.matrixMemory = this.ulbrecht.GetMatrixMemory();

				setInterval((ulb) => {
					if (!ulb.active)
						return;
					if (ulb.doUpdate)
						console.log("skipped a frame");
					ulb.doUpdate = true;
				}, 1000 / 15, this);


				this.scene = new THREE.Scene();
				this.scene.background = new THREE.Color('#221C1B');

				let r = MakeMaterial(this.matrixMemory);
				this.texture = r.texture;
				let plane = new THREE.Mesh(
					new THREE.PlaneGeometry(4, 1),
					//new THREE.MeshPhongMaterial({ DoubleSide: true, flatShading: true })
					r.material
				);
				plane.position.set(0, 0, 0);
				this.scene.add(plane);
			});

	}

	IsSetupDone() {
		if (this.ulbrecht == null)
			return false;
		if (!this.ulbrecht.IsDoneInitalizing())
			return false;
		if (this.matrixMemory == null)
			return false;
		return true;
	}

	Activate() {
		// todo: important: if this is called before this is fully initalized, it will crash. 
		// race condition at its finest.
		aeg.camera.position.set(0, 0, 2);
		aeg.camera.lookAt(0, 0, 0);
		this.active = true;

		this.div.style.display = "block";
	}

	Deactivate() {
		//throw "method not overriden!"
		this.active = false;
		this.div.style.display = "none";
	}

	Update() {
		if (this.doUpdate) {
			this.doUpdate = false;
			this.ulbrecht.Update(this.buttonPressed);
			this.texture.needsUpdate = true;
			this.buttonPressed.fill(false);
		}
		aeg.renderer.render(this.scene, aeg.camera);
	}
}


