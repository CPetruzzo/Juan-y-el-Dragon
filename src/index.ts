import { Application, Loader, Sprite } from 'pixi.js'

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

Loader.shared.add({url: "./MAXIM2.png", name:"Maxim"});
Loader.shared.add({url: "./suelo.png", name:"Suelo"});
Loader.shared.add({url: "./clampy.png", name:"myClampy"});

Loader.shared.onComplete.add(()=>{

	const clampy: Sprite = Sprite.from("Maxim");
	const piso: Sprite = Sprite.from("Suelo");

	console.log("Hola mundo!", clampy.height , clampy.width);
	
	clampy.anchor.set(0);
	piso.anchor.set(0);
	
	
	clampy.x = app.screen.width / 2.3;
	clampy.y = app.screen.height / 1.7;
	
	piso.x = app.screen.width / 8;
	piso.y = app.screen.height / 10;

	app.stage.addChild(piso);
	app.stage.addChild(clampy);

})

Loader.shared.load();