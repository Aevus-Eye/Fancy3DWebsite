import FancyUSScene from "./scenes/fancyUS/fancyUS.js";
import MainScene from "./scenes/main/mainScene.js";
import MoccaScene from "./scenes/moccaEmu/mocca.js";
import UlbrechtScene from "./scenes/ulbrecht/ulbrecht.js";

//aevus globals
var aeg = {
    canvas: null,
    gl: null,
    renderer: null,

    time: {
        time: 0,
        delta: 0,
    },

    scenes: {
        main: new MainScene(),
        ulbrecht: new UlbrechtScene(),
        mocca: new MoccaScene(),
        shader: new FancyUSScene(),
        //matrix3d:null,
        //mocca
        //ledWall
    },

    activeScene: null,
};

export default aeg;