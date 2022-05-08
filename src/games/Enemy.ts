import { AnimatedSprite, Graphics, IDestroyOptions, ObservablePoint, Rectangle, Sprite, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitBox {
   
    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    public canJump= true;
    public canHeal=true;
    private hitbox: Graphics;

    private juanWlk: AnimatedSprite;
    private juanIdle: Sprite;
    private juanAtk: AnimatedSprite;
    private juanDfnd: AnimatedSprite;
    private juanPot: Sprite;

    constructor()
    {
        super();

            //JUANCITO CAMINANDO
            this.juanWlk= new AnimatedSprite(
                [
                Texture.from("Juan1.png"),
                Texture.from("Juan2.png"),
                Texture.from("Juan3.png"),
                ], 
                false
                );
            this.juanWlk.scale.set(1);
            this.juanWlk.position.set(200,160);
            this.juanWlk.animationSpeed=0.1;
            this.juanWlk.anchor.set(1.5);
            this.juanWlk.play();
            this.juanWlk.visible=false

            // JUAN ATACANDO
            this.juanAtk= new AnimatedSprite(
                [
                Texture.from("Juan5.png"),
                Texture.from("Juan6.png"),
                ], 
                true
                );
            this.juanAtk.scale.set(1);
            this.juanAtk.position.set(200,150);
            this.juanAtk.animationSpeed=0.1;
            this.juanAtk.anchor.set(1.5);
            this.juanAtk.play();
            this.juanAtk.visible=false;

            // JUAN DEFENDIENDO
            this.juanDfnd= new AnimatedSprite(
                [
                Texture.from("Juan4.png"),
                ],
                true
                );
            this.juanDfnd.animationSpeed=0.05
            this.juanDfnd.play();
            this.juanDfnd.position.set(-90,-290)
            this.juanDfnd.visible=false;

            // JUAN TOMANDO SU POCION
            this.juanPot= new Sprite(Texture.from("Juan4.png"));
            this.juanPot.position.set(-85,-300)
            this.juanPot.visible=false;

            //JUAN QUIETITO
            this.juanIdle= new Sprite(Texture.from("Juan3.png"));
            this.juanIdle.position.set(-90,-290)
            this.juanIdle.visible=true;

            // PUNTO GUÍA
            const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,10);
            auxZero.endFill();

            // CAJAS
            this.hitbox=new Graphics();
            this.hitbox.beginFill(0xFF00FF, 0);
            this.hitbox.drawRect(0,0,200,280);
            this.hitbox.endFill();
            this.hitbox.x=-100
            this.hitbox.y=-280

            //AGREGANDO
            this.addChild(this.juanWlk);
            this.addChild(auxZero);
            this.addChild(this.hitbox)

            this.acceleration.y= Player.GRAVITY;
            Keyboard.down.on("ArrowUp",this.jump,this)

            // agrego todos los movimientos a la clase player
            this.addChild(
                this.juanWlk,
                this.juanAtk,
                this.juanDfnd,
                this.juanPot,
                this.juanIdle,
            )
    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined){
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
    }

    //  MOVIMIENTOS
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        this.juanWlk.update(deltaMS/(1000/60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)

        //  CAMINAR HACIA LA IZQUIERDA
        if (Keyboard.state.get("ArrowLeft")){
            this.speed.x=-Player.MOVE_SPEED;
            this.scale.set(0.5);
            this.juanWlk.visible=true;
            this.juanWlk.position.x=10
            this.juanIdle.visible=false;
            this.juanDfnd.visible=false;
            this.juanAtk.visible=false;
            this.juanPot.visible=false;
            this.juanWlk.scale.x=1;            
            this.juanWlk.position.set(200,150)

        } else if 
        //  CAMINAR HACIA LA DERECHA
        (Keyboard.state.get("ArrowRight")){
            this.speed.x=Player.MOVE_SPEED;
            this.scale.set(-0.5,0.5);
            this.juanWlk.position.set(200,150)
            this.juanWlk.visible=true;
            this.juanAtk.visible=false;
            this.juanIdle.visible=false;
            this.juanDfnd.visible=false;
            this.juanPot.visible=false;
        } else {
        //  FRENAR
            this.speed.x=0;
            this.juanWlk.visible=false;
            this.juanAtk.visible=false;
            this.juanIdle.visible=true;
            this.juanDfnd.visible=false;
            this.juanPot.visible=false;
        }
        // SALTAR
        if (Keyboard.state.get("ArrowUp")){
            this.jump;
            this.juanPot.visible=false;
        }
        // ATACAR
        if (Keyboard.state.get("Enter")){
            this.juanAtk.visible=true;
            this.juanWlk.visible=false;
            this.juanIdle.visible=false;
            this.juanDfnd.visible=false;
            this.juanPot.visible=false;
        }
        //DEFENDER
        if (Keyboard.state.get("Space")){
            this.juanAtk.visible=false;
            this.juanWlk.visible=false;
            this.juanIdle.visible=false;
            this.juanDfnd.visible=true;
            this.juanPot.visible=false;
        }

    }

    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    private jump(){
        if (this.canJump){
            this.speed.y=-(Player.GRAVITY*0.7)
            this.canJump=false;
        }
    }

    public heal(){
        if(this.canHeal){
            this.juanAtk.visible=false;
            this.juanWlk.visible=false;
            this.juanIdle.visible=false;
            this.juanDfnd.visible=false;
            this.juanPot.visible=true;
            this.canHeal=false;           
        }
    }

    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

    //PARA SEPARAR JUGADORES DE SUS PLATAFORMAS
    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x > platform.x) {
                this.x += overlap.width;
            } else if (this.x < platform.x) {
                this.x -= overlap.width;
            }
        }
        else {
            if (this.y > platform.y) {
                this.y -= overlap.height;
                this.speed.y=0;
                this.canJump=true;
            } else if (this.y < platform.y) {
                this.y += overlap.height;
            }
        }
    }
}