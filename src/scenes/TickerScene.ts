import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { Potion } from "../games/Potions";
import { IUpdateable } from "../utils/IUpdateable";


export class TickerScene extends Container implements IUpdateable {

    private playerJuan: Player;

    private platforms: Platform[];

    private world: Container;

    private Boss: AnimatedSprite;

    private potions: Potion[];

    constructor() {
        super();

        this.world = new Container;

        // UN POCO DE FONDO APOYADO EN EL MUNDO
        const bg = Sprite.from("SceneBG");
        bg.anchor.set(0.6);
        bg.scale.set(2)
        bg.position.y = 250;
        bg.position.x = WIDTH - 200;
        this.addChild(bg);

        const Floor = Sprite.from("Floor");
        Floor.anchor.set(0);
        Floor.scale.set(3)
        Floor.position.x = WIDTH - 1750;
        Floor.position.y = 610;
        this.world.addChild(Floor);

        // UN JEFE
        this.Boss = new AnimatedSprite(
            [Texture.from("DrgAtk1"),
            Texture.from("DrgFire1")
            ]);
        this.Boss.play();
        this.Boss.animationSpeed = 0.05;
        this.Boss.position.x = WIDTH + 200;
        this.Boss.position.y = HEIGHT - 280;
        this.Boss.scale.set(-1, 1);
        this.world.addChild(this.Boss);

        // UN JUGADOR
        this.playerJuan = new Player();
        this.playerJuan.scale.set(0.5);
        this.world.addChild(this.playerJuan);

        // LA PLATAFORMA PARA PISAR
        this.platforms = [];

        const plat1 = new Platform();
        plat1.position.x = 250;
        plat1.position.y = 400;
        this.world.addChild(plat1);
        this.platforms.push(plat1);

        // LAS POTIONES PARA TOMAR

        this.potions=[];

        const pot1 = new Potion();
        pot1.scale.set(0.1);
        pot1.position.set(400, HEIGHT - 170)
        this.world.addChild(pot1);
        this.potions.push(pot1);

        
        this.addChild(this.world);
    }

    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(deltaTime: number, _deltaFrame: number): void {
        this.playerJuan.update(deltaTime); //updateAnimation

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

            // // LIMITE DERECHO
            // if (this.playerJuan.x>WIDTH-100)
            // {            
            //     this.playerJuan.x=WIDTH-100;
            //     this.playerJuan.scale.x=-1;
            // }

            // LIMITE IZQUIERDO 
            if (this.playerJuan.x < 0) {
                this.playerJuan.x = 0;
                this.playerJuan.scale.set(0.5);
            }

            // LIMITES VERTICALES //

            // LIMITE INFERIOR
            if (this.playerJuan.y > (HEIGHT - 100)) {
                this.playerJuan.y = (HEIGHT - 100);
                this.playerJuan.canJump = true;
            }

            // // LIMITE SUPERIOR
            // if (this.playerJuan.y < 260) {
            //     this.playerJuan.y = 260;
            // }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerJuan.x * this.worldTransform.a + WIDTH / 3)
                &&
                (this.world.y = -this.playerJuan.y * this.worldTransform.a + (3 * HEIGHT / 4))
        }

        // TOMANDO LA POTION
        for (let potion of this.potions) {
            const overlap = checkCollision(this.playerJuan, potion);
            if (overlap != null) {
                potion.destroy();
            }
        }
    }
}