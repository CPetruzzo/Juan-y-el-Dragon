import { Container, NineSlicePlane, Sprite, Text, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { Enemy } from "../games/Enemy";
import { HealthBar } from "../games/HealthBar";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { Potion } from "../games/Potions";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { Cartel } from "./Cartel";


export class TickerScene extends Container implements IUpdateable {

    private playerJuan: Player;
    private platforms: Platform[];
    private world: Container;
    private Boss: Enemy;
    private potions: Potion[];
    private bar: HealthBar;
    private bar2: HealthBar;
    private FinalBoss: Enemy;
    private lastKeyPressed: Text;
    private cartelmisterioso: Cartel;
    private cartelfinal: Cartel;
    private dialogodragon: Text;
    private marco2: NineSlicePlane;
    public numero:number =0;
    private backgrounds: TilingSprite[];
    gameOver: boolean = false;

    constructor() {
        super();
        this.backgrounds=[];

        for (let i=1; i<6; i++){
            const background = new TilingSprite(
                Texture.from("B"+i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
            
            }

        this.world = new Container();


        // UN POCO DE FONDO APOYADO EN EL MUNDO
        // const bg = Sprite.from("SceneBG");
        // bg.anchor.set(0.6);
        // bg.scale.set(1.5)
        // bg.position.y = 290;
        // bg.position.x = WIDTH - 700;
        // this.addChild(bg);

        const Floor = Sprite.from("Floor");
        Floor.anchor.set(0);
        Floor.scale.set(3)
        Floor.position.x = WIDTH - 1750;
        Floor.position.y = 710;
        this.world.addChild(Floor);

        // UN JEFE
        this.Boss=new Enemy();
        this.Boss.position.set((WIDTH+200),(HEIGHT-280));
        this.world.addChild(this.Boss);

        //EL OTRO JEFE
        this.FinalBoss=new Enemy();
        this.FinalBoss.position.set((WIDTH+1470),(HEIGHT+10));
        this.FinalBoss.scale.set(3);
        this.world.addChild(this.FinalBoss);

        // UN JUGADOR
        this.playerJuan = new Player();
        this.playerJuan.scale.set(0.5);
        this.playerJuan.position.y=650;
        this.world.addChild(this.playerJuan);

        // LA PLATAFORMA PARA PISAR
        this.platforms = [];

        const plat1 = new Platform();
        plat1.scale.x=0.5;
        plat1.position.x = 300;
        plat1.position.y = 550;
        this.world.addChild(plat1);
        this.platforms.push(plat1);

        const plat2 = new Platform();
        plat2.scale.x=0.5
        plat2.position.x = 600;
        plat2.position.y = 400;
        this.world.addChild(plat2);
        this.platforms.push(plat2);

        const plat3 = new Platform();
        plat3.scale.x=0.5
        plat3.position.x = 750;
        plat3.position.y = 250;
        this.world.addChild(plat3);
        this.platforms.push(plat3);

        const plat4 = new Platform();
        plat4.scale.x=0.5
        plat4.position.x = 1400;
        plat4.position.y = 150;
        this.world.addChild(plat4);
        this.platforms.push(plat4);

        // LAS POTIONES PARA TOMAR

        this.potions = [];

        const pot1 = new Potion();
        pot1.scale.set(0.1);
        pot1.position.set(1365, HEIGHT - 830)
        this.world.addChild(pot1);
        this.potions.push(pot1);

        //LA BARRA DE VIDA DE JUAN:
        this.bar = new HealthBar();
        const marco1 = new NineSlicePlane(Texture.from("Marco"),
            35, 35, 35, 35
        );
        marco1.scale.set(1, 1);
        this.bar.scale.set(2,1);
        this.bar.position.set(5,5);
        
        // LA BARRA DE VIDA DEL DRAGON
        this.bar2 = new HealthBar();
        this.marco2 = new NineSlicePlane(Texture.from("Marco"),
            35, 35, 35, 35
        );
        this.marco2.scale.set(1, 1);
        this.marco2.position.x=this.Boss.position.x-80;
        this.marco2.position.y=this.Boss.position.y-50;
        this.bar2.scale.set(2,1)
        this.bar2.position.x=this.Boss.position.x-73;
        this.bar2.position.y=this.Boss.position.y-45;
        
        this.world.addChild(this.marco2,this.bar2);
        this.addChild(marco1,this.bar);

        // CARTEL QUE APARECE CUANDO VAS HACIA LA IZQUIERDA
        this.cartelmisterioso = new Cartel();
        this.cartelmisterioso.position.set(455, 260);
        this.cartelmisterioso.interactive = true;
        this.cartelmisterioso.visible=false;
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;
        {   //TEXTO
            this.lastKeyPressed = new Text("No tiene sentido volver", { fontSize: 30, fontFamily: ("Arial") });
            this.lastKeyPressed.anchor.set(0.5);
            this.lastKeyPressed.x = this.cartelmisterioso.width + 150
            this.lastKeyPressed.y = this.cartelmisterioso.height + 100
            this.lastKeyPressed.visible=false;
            dialog.addChild(this.lastKeyPressed);
        }

        // CARTEL QUE APARECE AL FINAL CON EL DRAGON
        this.cartelfinal = new Cartel();
        this.cartelfinal.position.set(455, 260);
        this.cartelfinal.interactive = true;
        this.cartelfinal.visible=false;
        const dialogfinal = new Container();
        dialog.x = 100;
        dialog.y = 50;
        {   //TEXTO
            this.dialogodragon = new Text("Este dragón es más fuerte que el otro", { fontSize: 20, fontFamily: ("Arial") });
            this.dialogodragon.anchor.set(0.5);
            this.dialogodragon.x = this.cartelfinal.width + 250
            this.dialogodragon.y = this.cartelfinal.height + 150
            this.dialogodragon.visible=false;
            dialogfinal.addChild(this.dialogodragon);
        }

        this.addChild(this.world);
        
        //CARTEL IZQUIERDA
        this.addChild(this.cartelmisterioso);
        this.addChild(dialog);

        //CARTEL DERECHA
        this.addChild(this.cartelfinal);
        this.addChild(dialogfinal);
    }
    
    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(deltaTime: number, _deltaFrame: number): void {
        // if (this.gameOver) return;
        this.playerJuan.update(deltaTime); //updateAnimation
        this.Boss.update(deltaTime);
        for (let i = 0; i < this.backgrounds.length; i++) {
			const background = this.backgrounds[i];
			const factor = i / 10;
            background.tilePosition.x -= factor * this.playerJuan.speed.x / 200;
		}



        // LA COLISION PARA QUE TENGA SU FISICA Y NO CAIGA A TRAVES DE LAS PLATAFORMAS
        for (let platform of this.platforms) {
            const overlap = checkCollision(this.playerJuan, platform);
            if (overlap != null) {
                this.playerJuan.separate(overlap, platform.position);
            }
        }

    // LIMITES DE LA PANTALLA
        {
    // LIMITES HORIZONTALES //
        // LIMITE DERECHO
            if (this.playerJuan.x > ((2 * WIDTH) - 100)) {
                this.playerJuan.x = (2 * WIDTH) - 100;
                this.playerJuan.scale.set(-0.5,0.5);
                this.cartelfinal.visible=true;
                this.dialogodragon.visible=true;
            } else {
                this.cartelfinal.visible=false;
                this.dialogodragon.visible=false;
            }
        // LIMITE IZQUIERDO 
            if (this.playerJuan.x < 0) {
                this.playerJuan.x = 0;
                this.playerJuan.scale.set(0.5);
                this.cartelmisterioso.visible=true;
                this.lastKeyPressed.visible=true;
            } else {
                this.cartelmisterioso.visible=false;
                this.lastKeyPressed.visible=false;
            }

    // LIMITES VERTICALES //
        // LIMITE INFERIOR
            if (this.playerJuan.y > (HEIGHT )) {
                this.playerJuan.y = (HEIGHT );
                this.playerJuan.canJump = true;
                this.gameOver = true;

            }
            if (this.Boss.y > (HEIGHT )) {
                this.Boss.y = (HEIGHT );
                this.Boss.canJump = true;
            }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerJuan.x * this.worldTransform.a + WIDTH / 3)
                &&
                (this.world.y = -this.playerJuan.y * this.worldTransform.a + (HEIGHT -50))
        }


        // TOMANDO LA POTION
        for (let potion of this.potions) {
            const overlap = checkCollision(this.playerJuan, potion);
            if (overlap != null) {
                console.log("tomé la poción")
                potion.destroy();
                this.bar.getHealth();
            }
        }


        //PELEANDO CON EL DRAGON
        const pelea = checkCollision(this.playerJuan, this.Boss);
        // MODO DEFENSIVO
        if (pelea != null && (Keyboard.state.get("Space"))) {
            this.playerJuan.separate(pelea, this.Boss.position);
        }
        // MODO ATAQUE
        else if (pelea != null && (Keyboard.state.get("Enter"))) {
            this.playerJuan.separate(pelea, this.Boss.position);
            this.playerJuan.attacks();
            if ((Keyboard.state.get("Enter"))){
                this.numero++;
                if (this.numero>50){
                    this.bar2.MidHealth();              
                }
                if (this.numero>75){
                    this.bar2.LowHealth();
                    if (this.bar.MidHealth){
                    this.bar.MidHealth();} else {this.bar.LowHealth()};            
                }
                if (this.numero>100){
                    this.world.removeChild(this.bar2,this.Boss,this.marco2);
                    if (this.bar.LowHealth) {
                        this.bar.LowHealth()
                    } else if (this.bar.MidHealth) {    
                        this.bar.MidHealth()
                    }
                }
            }
        }
        // RECIBIENDO DAÑO POR NO HACER NADA
        else if (pelea != null){
            this.playerJuan.separate(pelea, this.Boss.position);
            this.bar.getRealDamage();
            this.bar.getDamage();
            this.playerJuan.getHit();
        }
    }
}
