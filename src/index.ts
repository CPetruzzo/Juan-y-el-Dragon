import { Application, Loader, Sprite } from 'pixi.js'
import { assets } from './assets';
import { CieloTierra } from './CieloTierra';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

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

	const maxim: Sprite = Sprite.from("Maxim");

	maxim.anchor.set(0);
	maxim.x = app.screen.width / 2.4;
	maxim.y = app.screen.height / 1.65;
	maxim.scale.x=1.5
	maxim.scale.y=1.5

	// también podría poner maxim.position.set(numero, numero); 
	// o sino maxim.scale.set(numero, numero);

	// para hacer un paquete cielo y tierra en este caso, creo el container
	const fondo: CieloTierra = new CieloTierra();

	// al final solo agrego lo que sería el fondo y mi personaje
	app.stage.addChild(fondo);
	app.stage.addChild(maxim);

})

Loader.shared.load();