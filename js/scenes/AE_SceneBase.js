//todo: bool that determines if the calss is fully loaded
export default class AE_SceneBase {

	/**
	 * gets called once in the beginning of the programm
	 */
	Setup(){
		throw "method not overriden!"
	}

	/**
	 * Gets called whenever the scene is switched to this scene
	 */
	Activate() {
		throw "method not overriden!"
	}
	
	/**
	 * gets called when the scene is switched away from this scene
	 */
	Deactivate(){
		throw "method not overriden!"
	}
	
	/**
	 * is called once per frame
	 */
	Update(){
		throw "method not overriden!"
	}
}