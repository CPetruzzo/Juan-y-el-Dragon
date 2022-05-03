import { Application, Loader, Ticker} from 'pixi.js'
import { assets } from './assets';
import { UIDemo } from './scenes/UIDemo';
import { Scene } from './scenes/Scene';
import { Keyboard } from './utils/Keyboard';
// import { Ataque } from './scenes/EscenaClase5';
// import { Dvd } from './scenes/Dvd';
import { WarriorMoving } from './scenes/juanMejorado copy';

export const WIDTH=1280;
export const HEIGHT=720;

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGHT
});


Keyboard.initialize(); /* lo llamo una vez y nunca mas */
window.addEventListener("resize", ()=>{
	console.log("resized!");
	const scaleX= window.innerWidth / app.screen.width;
	const scaleY= window.innerHeight / app.screen.height;
	const scale= Math.min(scaleX, scaleY)

	const gameWidth= Math.round(app.screen.width * scale);
	const gameHeight= Math.round(app.screen.height * scale);

	const marginHorizontal= Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical= Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWidth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = marginHorizontal + "px";
	app.view.style.marginRight = marginHorizontal + "px";

	app.view.style.marginTop = marginVertical + "px";
	app.view.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event ("resize"));


Loader.shared.add(assets);


Loader.shared.onComplete.add(()=>{

	const myScene = new Scene();
		app.stage.addChild(myScene);


	// const attack = new Ataque();
	// 	app.stage.addChild(attack);

	Ticker.shared.add(
		function(deltaFrame)
		{
		//attack.update(Ticker.shared.deltaMS,deltaFrame);
		juancito.update(Ticker.shared.deltaMS,deltaFrame);
		// dvd.update(Ticker.shared.deltaMS,deltaFrame);

		;})

	// const dvd = new Dvd();
	// 	app.stage.addChild(dvd);

	const juancito = new WarriorMoving();
		app.stage.addChild(juancito);

		const myDemo = new UIDemo();
		app.stage.addChild(myDemo);

})

Loader.shared.load();