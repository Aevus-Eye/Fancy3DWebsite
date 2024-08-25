import aeg from "../../globals.js";
import AE_SceneBase from "../AE_SceneBase.js";
import * as THREE from "../../threejs/three.module.js";
import LcdFont from "./font.js";
import ARS from "./wasm/MoccaTreiberHack.js";

let _testID = 0;

function MakeLcdShader() {
    const FontTexture = new THREE.DataTexture(new Uint8Array(LcdFont), 5 * 256, 1, THREE.RedFormat, THREE.UnsignedByteType);

    const uniforms = {
        //dir: { value: dir },
        //matrixBuffer: { value: buffer },
        font: {
            type: "t",
            value: FontTexture,
        },
        char: {
            value: [
                97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
                117, 118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
                79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 49, 50, 51, 52, 53, 54, 55, 56,
                57, 32, 116, 101, 115, 116, 32, 116, 101, 120, 116, 32, 104, 97, 108, 108, 111, 46, 33, 63,
            ]
        },
    };
    //setInterval(() => {
    //    let t = document.getElementById("textArea").value;
    //    for (let i = 0; i < t.length; i++) {
    //        uniforms.char.value[i]=t.charCodeAt(i);
    //    }
    //}, 100);
    // setInterval(() => {
    //     _testID++;
    //     uniforms.char.value[_testID%80]=_testID%256;
    //     uniforms.char.value[(_testID+1)%80]='_'.charCodeAt(0);

    // }, 100);
    const vertexShader = `
	
	varying vec2 vUv;
	//varying vec3 vColor;
	//varying vec3 vNormal;
    
	void main()
	{
        vUv = vec2(uv.x,1.0-uv.y); //vec2(uv.x*128.0,(1.0-uv.y)*32.0);
		//vColor = color;
		//vNormal=normal;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
	}
	`;

    const fragmentShader = `

	uniform sampler2D font;
	//uniform uint size;
    //uniform uint char;
    uniform uint char[80];

    varying vec2 vUv;

    
    //const uint char=0x4Au;

    void main(void) {
        vec2 charPos = floor(vUv*vec2(20.0,4.0));
        uvec2 charUv = uvec2(mod(vUv.x*20.0*6.0,6.0), mod(vUv.y*4.0*8.0,8.0));
        //uvec2(charPos * vec2(5.0,8.0)- floor(vec2(vUv.x*20.0*5.0, vUv.y*4.0*8.0)));
        
        uint color;
        if(charUv.x==5u)
            color=0u;
        else{
            uint data=uint(round(texelFetch(font, ivec2(char[int(charPos.x+charPos.y*20.0)]*5u + charUv.x,0u), 0).x*255.0));
            color = (data>>charUv.y)&1u;
        }

        gl_FragColor = vec4( vec3(color), 1.0 );
        //gl_FragColor = vec4( vec2(charUv)/vec2(5.0,8.0), float(data), 1.0 );

		//uint col=uint(round(texelFetch(ae_tex, ivec2(vUv), 0).x*255.0));
		//vec2 cir=vUv-floor(vUv)-0.5;
		//vec3 baseColor=vec3((col>>2u)&1u,(col>>1u)&1u,(col)&1u);
		//vec3 color=baseColor*smoothstep(0.30,0.07,cir.x*cir.x+cir.y*cir.y);

		//gl_FragColor = vec4( color, 1.0 );
    }
	`;

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        //vertexColors: true,
        fragmentShader,
        //side: THREE.DoubleSide,
    });

    return { material, uniforms };
    //return { material, texture: ae_texture };
}

function MakeLedShader() {

    const uniforms = {
        led: { value: 0 },
    };

    const vertexShader = `
	
	varying vec2 vUv;
	//varying vec3 vColor;
	//varying vec3 vNormal;
    
	void main()
	{
        vUv = vec2(uv.x,1.0-uv.y); //vec2(uv.x*128.0,(1.0-uv.y)*32.0);
		//vColor = color;
		//vNormal=normal;
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
	}
	`;

    const fragmentShader = `

	//uniform sampler2D font;
	//uniform uint size;
    //uniform uint char;
    uniform highp uint led;

    varying vec2 vUv;

    
    //const uint char=0x4Au;

    void main(void) {
        float sx=(1.0-vUv.x)*8.199;
        if(fract(sx)<0.2)
            sx=20.0;
        float x=floor(sx);
        uint on=led>>uint(x);
        on&=1u;
        gl_FragColor = vec4( on, on, on, 1.0 );
    }
	`;

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        //vertexColors: true,
        //side: THREE.DoubleSide,
    });

    return { material, uniforms };
}


export default class MoccaScene extends AE_SceneBase {
    scene;
    lcdShaderUniforms;
    div = document.getElementById("MoccaScene");
    html = {
        adc: [],
        button: [...document.getElementsByClassName("MoccaButton")],
        schalter: [...document.getElementsByClassName("MoccaSchalter")],
        mode: document.getElementById("MoccaMode"),
    }
    buttonMask = 0;

    Setup() {
        this.html.button.forEach(bt => bt.onmousedown = () => this.buttonMask |= 1 << bt.value);
        this.html.button.forEach(bt => bt.onmouseup = () => this.buttonMask &= ~(1 << bt.value));

        this.html.adc[10] = document.getElementById("adc10");
        this.html.adc[11] = document.getElementById("adc11");
        console.log("setup");
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#221C1B');

        const pointLight1 = new THREE.PointLight(0xffffff);
        pointLight1.position.set(500, 500, 500);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 0.25);
        pointLight2.position.set(- 500, - 500, - 500);
        this.scene.add(pointLight2);

        //let sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
        //aeg.mainScene.add( sphere );

        //board
        let mocca = new THREE.Mesh(new THREE.PlaneGeometry(2, 3), new THREE.MeshPhongMaterial({ flatShading: true }));
        mocca.position.set(0, 0, 0);
        this.scene.add(mocca);
        //lcd
        let lcdShader = MakeLcdShader();
        this.lcdShaderUniforms = lcdShader.uniforms;
        let lcd = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.4 / 20 / 6 * 4 * 8), lcdShader.material);
        lcd.position.set(0, -.5, .11);
        this.scene.add(lcd);
        //led
        let ledShader = MakeLedShader();
        let led = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.3), ledShader.material);
        led.position.set(0, -.0, .1);
        this.scene.add(led);
        //schalter
        let schalter = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.3), new THREE.MeshPhongMaterial({ flatShading: true, color: "#483256" }));
        schalter.position.set(0, -1, .1);
        this.scene.add(schalter);
        //rgb
        let rgbMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshPhongMaterial({ flatShading: true, color: "#483256" }));
        rgbMesh.position.set(-0.5, 1, .1);
        this.scene.add(rgbMesh);
        //console.log("rgb mesh", rgbMesh);
        this.ars = new ARS();
        this.ars.start((lcd, led, rgb) => {
            lcdShader.uniforms.char.value = lcd;
            ledShader.uniforms.led.value = led;
            //console.log(rgb);
            rgbMesh.material.color.set(rgb);
            //rgbMesh.material.emissive=new THREE.Color(rgb);
        })
        //lcdShader.uniforms);

    }

    /**
     * Gets called whenever the scene is switched to this scene
     */
    Activate() {
        console.log("activating mocca...");
        aeg.camera.position.set(0, 0, 2);
        aeg.camera.lookAt(0, 0, 0);
        this.div.style.display = "block";
        //RunWebWorker(this.lcdShaderUniforms);
        //StartModule().then(() => this);
    }

    /**
     * gets called when the scene is switched away from this scene
     */
    Deactivate() {
        this.div.style.display = "none";
        //StopModule();
        //StopWebWorker();
        //throw "method not overriden!"
    }

    /**
     * is called once per frame
     */
    Update() {
        this.ars.setADC(this.html.adc[10].value, 10);
        this.ars.setADC(this.html.adc[11].value, 11);
        this.ars.setADC(this.html.adc[10].value, 8);
        this.ars.setADC(this.html.adc[11].value, 9);

        this.ars.setTaster(this.buttonMask);
        this.ars.setSchalter(this.html.schalter.reduce((total, element) => total + (element.checked ? 1 << element.value : 0), 0));
        this.ars.switchModeTo(this.html.mode.value);

        this.ars.update();
        aeg.renderer.render(this.scene, aeg.camera);
    }
}