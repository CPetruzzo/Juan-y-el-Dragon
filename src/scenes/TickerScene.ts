import { sound } from "@pixi/sound";
import { Container, Sprite, Text, Texture, TilingSprite } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { Enemy } from "../games/Enemy";
import { HealthBar } from "../games/HealthBar";
import { checkCollision } from "../games/IHitBox";
import { Platform } from "../games/Platform";
import { Player } from "../games/Player";
import { Potion } from "../games/Potions";
import { WeaponBox } from "../games/Weapon";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";
import { Cartel } from "./Cartel";
import { Joystick } from "pixi-virtual-joystick";


export class TickerScene extends Container implements IUpdateable {

    private playerJuan: Player;
    private sword: WeaponBox;
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
    public numero: number = 0;
    private backgrounds: TilingSprite[];
    private floor: TilingSprite;
    gameOver: boolean = false;

    constructor() {
        super();
        this.backgrounds = [];

        this.world = new Container();

        // SOUND TRUCK
        const BGM = sound.find("Music1");
        BGM.play({ loop: true, volume: 0.05 })

        // FONDOS
        for (let i = 1; i < 6; i++) {
            const background = new TilingSprite(
                Texture.from("B" + i),
                1280,
                720
            );
            this.addChild(background);
            this.backgrounds.push(background);
        }

        // SUELO
        this.floor = new TilingSprite(Texture.from("B6"),
            7000,
            720
        );
        this.floor.position.x = -WIDTH;
        this.floor.tilePosition.x = this.floor.tilePosition.x;
        this.world.addChild(this.floor);


        // const Floor = Sprite.from("Floor");
        // Floor.anchor.set(0);
        // Floor.scale.set(3)
        // Floor.position.x = WIDTH - 1750;
        // Floor.position.y = 710;
        // this.world.addChild(Floor);

        // UN JEFE
        this.Boss = new Enemy();
        this.Boss.position.set((WIDTH + 200), (HEIGHT - 280));
        this.world.addChild(this.Boss);

        //EL OTRO JEFE
        this.FinalBoss = new Enemy();
        this.FinalBoss.position.set((WIDTH + 1470), (HEIGHT + 10));
        this.FinalBoss.scale.set(3);
        this.world.addChild(this.FinalBoss);

        // UN JUGADOR
        this.playerJuan = new Player();
        this.playerJuan.scale.set(0.5);
        this.playerJuan.position.y = 650;
        this.world.addChild(this.playerJuan);

        this.sword = new WeaponBox();
        this.sword.position = this.playerJuan.position;
        // this.playerJuan.addChild(this.sword);

        // LA PLATAFORMA PARA PISAR
        this.platforms = [];
        const plat1 = new Platform();
        plat1.scale.x = 0.5;
        plat1.position.x = 300;
        plat1.position.y = 550;
        this.world.addChild(plat1);
        this.platforms.push(plat1);
        const plat2 = new Platform();
        plat2.scale.x = 0.5
        plat2.position.x = 600;
        plat2.position.y = 400;
        this.world.addChild(plat2);
        this.platforms.push(plat2);
        const plat3 = new Platform();
        plat3.scale.x = 0.5
        plat3.position.x = 750;
        plat3.position.y = 250;
        this.world.addChild(plat3);
        this.platforms.push(plat3);
        const plat4 = new Platform();
        plat4.scale.x = 0.5
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
        this.bar.scale.set(2, 1);
        this.bar.position.set(5, 5);

        // LA BARRA DE VIDA DEL DRAGON
        this.bar2 = new HealthBar();
        this.bar2.scale.set(2, 1)
        this.bar2.position.x = this.Boss.position.x - 73;
        this.bar2.position.y = this.Boss.position.y + 53;

        this.world.addChild(this.bar2);
        this.addChild(this.bar);

        // CARTEL QUE APARECE CUANDO VAS HACIA LA IZQUIERDA
        this.cartelmisterioso = new Cartel();
        this.cartelmisterioso.position.set(455, 260);
        this.cartelmisterioso.interactive = true;
        this.cartelmisterioso.visible = false;
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;
        {   //TEXTO
            this.lastKeyPressed = new Text("No tiene sentido volver", { fontSize: 30, fontFamily: ("Arial") });
            this.lastKeyPressed.anchor.set(0.5);
            this.lastKeyPressed.x = this.cartelmisterioso.width + 150
            this.lastKeyPressed.y = this.cartelmisterioso.height + 100
            this.lastKeyPressed.visible = false;
            dialog.addChild(this.lastKeyPressed);
        }

        // CARTEL QUE APARECE AL FINAL CON EL DRAGON
        this.cartelfinal = new Cartel();
        this.cartelfinal.position.set(455, 260);
        this.cartelfinal.interactive = true;
        this.cartelfinal.visible = false;
        const dialogfinal = new Container();
        dialog.x = 100;
        dialog.y = 50;
        {   //TEXTO
            this.dialogodragon = new Text("Este dragón es más fuerte que el otro", { fontSize: 20, fontFamily: ("Arial") });
            this.dialogodragon.anchor.set(0.5);
            this.dialogodragon.x = this.cartelfinal.width + 250
            this.dialogodragon.y = this.cartelfinal.height + 150
            this.dialogodragon.visible = false;
            dialogfinal.addChild(this.dialogodragon);
        }

        this.addChild(this.world);

        //CARTEL IZQUIERDA
        this.addChild(this.cartelmisterioso);
        this.addChild(dialog);

        //CARTEL DERECHA
        this.addChild(this.cartelfinal);
        this.addChild(dialogfinal);

        const joystick = new Joystick({
            outer: Sprite.from("outer"), // ("images/joystick.png")
            inner: Sprite.from("inner"), // ("images/joystick-handle.png")

            outerScale: { x: 0.7, y: 0.7 },
            innerScale: { x: 0.8, y: 0.8 },

            onChange: (data) => {
                console.log(data.angle); // Angle from 0 to 360
                console.log(data.direction); // 'left', 'top', 'bottom', 'right', 'top_left', 'top_right', 'bottom_left' or 'bottom_right'.
                console.log(data.power); // Power from 0 to 1
                const speed = 5; // Velocidad de movimiento del personaje

                // Convierte el ángulo a radianes
                const angleRad = (data.angle * Math.PI) / 180;

                // Calcula la velocidad en los ejes X e Y en función del ángulo y la potencia
                const vx = Math.cos(angleRad) * data.power * speed;
                const vy = Math.sin(angleRad) * data.power * speed;

                // Mueve al personaje
                this.playerJuan.move(vx, vy);
            },

            onStart: () => {
                console.log('start')
            },

            onEnd: () => {
                console.log('end')
            },
        });

        joystick.scale.set(1.5);
        joystick.position.set(150, HEIGHT - 120);
        this.addChild(joystick);

    }

    // ACTUALIZACION PARA DARLE SU FISICA Y SU MOVIMIENTO
    public update(deltaTime: number, _deltaFrame: number): void {
        // if (this.gameOver) return;
        this.playerJuan.update(deltaTime); //updateAnimation
        this.Boss.update(deltaTime);

        // PARALLAX
        for (let i = 0; i < this.backgrounds.length; i++) {
            const background = this.backgrounds[i];
            const factor = (i / 6);
            if (this.playerJuan.x < 0 || ((this.playerJuan.x > (2 * WIDTH) - 100))) {
                background.tilePosition.x = background.tilePosition.x;
            }
            else {
                background.tilePosition.x -= factor * this.playerJuan.speed.x / 200;
            }


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

                this.playerJuan.scale.set(-0.5, 0.5);
                this.cartelfinal.visible = true;
                this.dialogodragon.visible = true;
            } else {
                this.cartelfinal.visible = false;
                this.dialogodragon.visible = false;
            }
            // LIMITE IZQUIERDO 
            if (this.playerJuan.x < 0) {
                this.playerJuan.x = 0;
                this.world.x = 0;
                this.playerJuan.scale.set(0.5);
                this.cartelmisterioso.visible = true;
                this.lastKeyPressed.visible = true;
            } else {
                this.cartelmisterioso.visible = false;
                this.lastKeyPressed.visible = false;
            }

            // LIMITES VERTICALES //
            // LIMITE INFERIOR
            if (this.playerJuan.y > (HEIGHT)) {
                this.playerJuan.y = (HEIGHT);
                this.playerJuan.canJump = true;
                this.gameOver = true;

            }
            if (this.Boss.y > (HEIGHT)) {
                this.Boss.y = (HEIGHT);
                this.Boss.canJump = true;
            }
        }

        // CAMARA SEGUÍ A MI PERSONAJE
        {
            (this.world.x = - this.playerJuan.x * this.worldTransform.a + WIDTH / 3)
        }


        // TOMANDO LA POTION
        for (let potion of this.potions) {
            const overlap = checkCollision(this.playerJuan, potion);
            if (overlap != null) {
                console.log("tomé la poción")
                potion.destroy();
                this.bar.getHealth();
                this.numero = 0;
            }
        }


        //PELEANDO CON EL DRAGON
        const pelea = checkCollision(this.playerJuan, this.Boss);
        // MODO DEFENSIVO
        if (pelea != null && (Keyboard.state.get("KeyK"))) {
            this.playerJuan.separate(pelea, this.Boss.position);
            this.playerJuan.speed.x = 0;

        }
        // MODO ATAQUE
        else if (pelea != null && (Keyboard.state.get("KeyJ"))) {
            this.playerJuan.separate(pelea, this.Boss.position);
            this.playerJuan.attacks();
            if ((Keyboard.state.get("KeyJ"))) {
                this.numero++;
                if (this.numero > 50) {
                    this.bar2.MidHealth();
                }
                if (this.numero > 75) {
                    this.bar2.LowHealth();
                    if (this.bar.MidHealth) {
                        this.bar.MidHealth();
                    } else { this.bar.LowHealth() };
                }
                if (this.numero > 100) {
                    this.world.removeChild(this.bar2, this.Boss);
                    if (this.bar.LowHealth) {
                        this.bar.LowHealth()
                    } else if (this.bar.MidHealth) {
                        this.bar.MidHealth()
                    }
                }
            }
        }
        // RECIBIENDO DAÑO POR NO HACER NADA
        else if (pelea != null) {
            this.playerJuan.separate(pelea, this.Boss.position);
            this.bar.getRealDamage();
            this.bar.getDamage();
            this.playerJuan.getHit();
        }
    }
}
