/*
example:
D:\personal\emscripten\emsdk\upstream\emscripten\emcc code\wasm\Test.cpp --no-entry -o code\wasm\ulbrecht.wasm
** atmel_reto_spiel:
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s ASYNCIFY -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.wasm js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.c js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
** minimal
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -o js/scenes/moccaEmu/wasm/min.wasm js/scenes/moccaEmu/wasm/c/minimal/min.c
** testing...
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c -O3 -s ASYNCIFY -o test.js js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.c js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 

 newest command:
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s ASYNCIFY -s EXPORT_ES6=1 -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.jsm js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.c js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc "-Dmain=EMSCRIPTEN_KEEPALIVE AE_Main" -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s ASYNCIFY -s EXPORT_ES6=1 -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.jsm js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.c js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/atmel_reto_spiel/Mocca_Demo.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/projects/Lift.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/projects/Lift.cpp  js/scenes/moccaEmu/wasm/c/projects/Init.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/*.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/projects/Lift.cpp js/scenes/moccaEmu/wasm/c/projects/Unterprogramm.cpp js/scenes/moccaEmu/wasm/c/projects/Binaerzaehler.cpp  js/scenes/moccaEmu/wasm/c/projects/Init.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/projects/Lift.cpp js/scenes/moccaEmu/wasm/c/projects/Unterprogramm.cpp js/scenes/moccaEmu/wasm/c/projects/Binaerzaehler.cpp js/scenes/moccaEmu/wasm/c/projects/BitZaeler.cpp  js/scenes/moccaEmu/wasm/c/projects/Init.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
D:\personal\emscripten\emsdk\upstream\emscripten\emcc -Ijs\scenes\moccaEmu\wasm\c --no-entry -O3 -s EXPORT_ES6=1 -s MODULARIZE=1 -s INITIAL_MEMORY=64kB -s TOTAL_STACK=32kB -o js/scenes/moccaEmu/wasm/atmel_reto_spiel.js js/scenes/moccaEmu/wasm/c/projects/Spiel.cpp js/scenes/moccaEmu/wasm/c/projects/Rechner.cpp js/scenes/moccaEmu/wasm/c/projects/Lift.cpp js/scenes/moccaEmu/wasm/c/projects/Unterprogramm.cpp js/scenes/moccaEmu/wasm/c/projects/Binaerzaehler.cpp js/scenes/moccaEmu/wasm/c/projects/BitZaeler.cpp js/scenes/moccaEmu/wasm/c/projects/MultiFB.cpp  js/scenes/moccaEmu/wasm/c/projects/Init.cpp js/scenes/moccaEmu/wasm/c/Mocca_Treiber/Mocca_Treiber.c js/scenes/moccaEmu/wasm/c/avr/io.c 
// add -g1 for nicely formatted js

other project:
D:\personal\emscripten\emsdk\upstream\emscripten\emcc main.cpp -O3 --no-entry -o main.mjs -s EXPORT_ES6=1 -g1 -s ASYNCIFY

*/

////// todo: check out robocontroller
////// todo: rgb stern
////// todo: finish RgbStreiffen
// geschikspiel
// protog mask

import { clamp, isInRange } from "../../../misc.js";
import ARS_EMCC_Module from "./atmel_reto_spiel.js"

export default class MoccaEmulator {
    ptr = {
        leds1: 0,
        leds2: 0,
        taster: 0,
        schalter: 0,
        lcd_buffer: 0,
        adc: 0,
        rgb: 0,
    };
    doNextFrame = true;
    module;
    mode = null;
    mainFns = [];
    initFns = [];
    //uniforms;
    setVisualsCB;

    async start(setVisualsCB) {
        this.setVisualsCB = setVisualsCB;
        //this.uniforms = uniforms;
        let This = this;
        let imports = {
            MoccaInitPtrs(leds1, leds2, taster, schalter, lcd_buffer, adc, rgb) {
                This.ptr = {
                    leds1, leds2, taster, schalter, lcd_buffer, adc: adc / 2, rgb: rgb / 2,
                };
                //console.log("pointers initalized", This.ptr);
            },
            print(...args) {
                console.log("logging: ", ...args);
            },
            printErr(...args) {
                console.log("logging error: ", ...args);
            },
            wasmMemory: new WebAssembly.Memory({ initial: 1, maximum: 1 }),
        }

        let module = await ARS_EMCC_Module(imports);

        this.module = module;
        this.mainFns = [() => this.module._AE_Spiel_Main(/*                  */), () => this.module._AE_Rechner_Main(), () => this.module._AE_Lift_Main(), () => this.module._AE_Unterprogramm_Main(), () => this.module._AE_Binaerzaehler_Main(), () => this.module._AE_BitZaeler_Main(), () => this.module._AE_MultiFB_Main(),];
        this.initFns = [() => this.module._AE_Spiel_Init(Math.random() * 0x7fff), () => this.module._AE_Rechner_Init(), () => this.module._AE_Lift_Init(), () => this.module._AE_Unterprogramm_Init(), () => this.module._AE_Binaerzaehler_Init(), () => this.module._AE_BitZaeler_Init(), () => this.module._AE_MultiFB_Init(),];
        this.switchModeTo(0);
    }

    update() {
        if (this.module && this.doNextFrame) {
            this.doNextFrame = false;

            let sleep = this.mainFns[this.mode]();
            if (typeof sleep !== "number" || sleep < 1)
                sleep = 1;

            setTimeout(() => this.doNextFrame = true, sleep);

            let lcdBuffer = this.module.HEAPU8.slice(this.ptr.lcd_buffer, this.ptr.lcd_buffer + 80);
            let leds = this.module.HEAPU8[this.ptr.leds1] + (this.module.HEAPU8[this.ptr.leds2] << 8);
            let rgb =
                ((this.module.HEAPU16[this.ptr.rgb + 0] >> 2) << 16) +
                ((this.module.HEAPU16[this.ptr.rgb + 1] >> 2) << 8) +
                ((this.module.HEAPU16[this.ptr.rgb + 2] >> 2) << 0);

            this.setVisualsCB(lcdBuffer, leds, rgb);
            //this.uniforms.char.value = this.module.HEAPU8.slice(this.ptr.lcd_buffer, this.ptr.lcd_buffer + 80); //new Uint8Array(this.module.HEAP8, this.ptr.lcd_buffer, 20 * 4);
        }
    }

    stop() {
        this.module = null;
    }

    setADC(adcValue, adcChannel) {
        if (!isInRange(adcChannel, 0, 11))
            return;
        adcValue = clamp(adcValue, 0, 1023);
        this.module.HEAPU16[this.ptr.adc + adcChannel] = adcValue;
    }

    setTaster(mask) {
        this.module.HEAPU8[this.ptr.taster] = mask;
    }

    setSchalter(mask) {
        this.module.HEAPU8[this.ptr.schalter] = mask;
    }

    switchModeTo(mode) {
        if (mode === this.mode)
            return;
        this.mode = mode;
        this.module._AE_Reset_Board();
        this.initFns[mode]();
    }
}