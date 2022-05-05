import { Container, Sprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { IUpdateable } from "../utils/IUpdateable";


export class TickerScene extends Container implements IUpdateable {

    private playerJuan: Player;

    private platforms: Platform[];

    private world: Container;

    constructor() {
        super();

        this.world = new Container;

        const bg = Sprite.from("Cielo");
        bg.anchor.set(0.4);
        this.world.addChild(bg);
        const Floor = Sprite.from("Suelo");
        Floor.scale.x = 1.34
        Floor.scale.y = 1.34
        Floor.anchor.set(0);
        this.world.addChild(Floor);

        this.playerJuan = new Player();
        this.world.addChild(this.playerJuan);

        this.platforms = [];

        const plat1 = new Platform();
        plat1.position.x = 250;
        plat1.position.y = 500;
        this.world.addChild(plat1);
        this.platforms.push(plat1);

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

        // LIMITES HORIZONTALES

        // // LIMITE DERECHO
        // if (this.playerJuan.x>WIDTH-100)
        // {            
        //     this.playerJuan.x=WIDTH-100;
        //     this.playerJuan.scale.x=-1;
        // }

        // // LIMITE IZQUIERDO 
        // if (this.playerJuan.x<100)
        // {
        //     this.playerJuan.x=100;
        //     this.playerJuan.scale.x=1;
        // }

        // LIMITES VERTICALES

        // LIMITE INFERIOR
        if (this.playerJuan.y > (HEIGHT - 100)) {
            this.playerJuan.y = (HEIGHT - 100);
            this.playerJuan.canJump = true;
        }

        // LIMITE SUPERIOR
        if (this.playerJuan.y < 260) {
            this.playerJuan.y = 260;
        }

        (this.world.x = - this.playerJuan.x * this.worldTransform.a + WIDTH / 2) 
        && 
        (this.world.y = -this.playerJuan.y * this.worldTransform.a + (3*HEIGHT / 4))
    }
}