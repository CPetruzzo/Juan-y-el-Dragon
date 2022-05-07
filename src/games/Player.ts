import { AnimatedSprite, Graphics, IDestroyOptions, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Player extends PhysicsContainer implements IHitBox {
   
    private static readonly GRAVITY = 1000;
    private static readonly MOVE_SPEED = 350;
    private juanMov: AnimatedSprite ;
    public canJump= true;
    private hitbox: Graphics;

    constructor()
    {
        super();

            //JUANCITO CAMINANDO
            this.juanMov= new AnimatedSprite(
                [
                Texture.from("Juan1.png"),
                Texture.from("Juan2.png"),
                Texture.from("Juan3.png"),
                ], 
                true
                );
            this.juanMov.scale.set(1);
            this.juanMov.position.set(200,160);
            this.juanMov.animationSpeed=0.05;
            this.juanMov.anchor.set(1.5);
            this.juanMov.play();

            
            
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
            this.addChild(this.juanMov);
            this.addChild(auxZero);
            this.addChild(this.hitbox)

            this.acceleration.y= Player.GRAVITY;
            Keyboard.down.on("ArrowUp",this.jump,this)

    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL PLAYER TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined){
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
    }

   // // ESTADOS - SPRITES
    // public currentMovement (Movement:any, )
    // this.walkingLarry = new AnimatedSprite (
    //     [
    //         Texture.from("walkLarry1"),
    //         Texture.from("walkLarry2"),
    //         Texture.from("walkLarry3"),
    //         Texture.from("walkLarry4"),
    //         Texture.from("walkLarry5"),
    //         Texture.from("walkLarry6"),
    //     ], false
    // );
    // this.idleLarry = Sprite.from("idleLarry");
    // this.crouchingLarry = new AnimatedSprite (
    //     [
    //         Texture.from("crouchLarry3")
    //     ], false
    // )
    // this.jumpingLarry = Sprite.from("jumpLarry1");
    // this.idleLarry.anchor.set(0.5);
    // this.idleLarry.scale.set(2.5);
    // this.walkingLarry.anchor.set(0.5);
    // this.walkingLarry.scale.set(2.5);
    // this.walkingLarry.play();
    // this.walkingLarry.animationSpeed = 0.175;
    // this.walkingLarry.visible = false;
    // this.crouchingLarry.anchor.set(0.5);
    // this.crouchingLarry.scale.set(2.5);
    // this.crouchingLarry.position.y = 18;
    // this.crouchingLarry.play();
    // this.crouchingLarry.visible = false;
    // this.jumpingLarry.anchor.set(0.5);
    // this.jumpingLarry.scale.set(2.5);
    // this.jumpingLarry.visible = false;

    // this.physicsLarry = new PhysicsContainer();
    // this.physicsLarry.acceleration.y = -Larry.GRAVITY;
    // this.physicsLarry.addChild(
    //     this.walkingLarry,
    //     this.idleLarry,
    //     this.crouchingLarry,
    //     this.jumpingLarry
    // );
   

    //  MOVIMIENTOS
    
    //
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        this.juanMov.update(deltaMS/(1000/60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)

    
        //  CAMINAR HACIA LA IZQUIERDA
        if (Keyboard.state.get("ArrowLeft")){
            this.speed.x=-Player.MOVE_SPEED;
            this.scale.set(0.5);
        } else if 
        //  CAMINAR HACIA LA DERECHA
        (Keyboard.state.get("ArrowRight")){
            this.speed.x=Player.MOVE_SPEED;
            this.scale.set(-0.5,0.5);
        } else {
        //  FRENAR
            this.speed.x=0;
        }
            
        // SALTAR
        if (Keyboard.state.get("ArrowUp")){
            this.jump;
        }
    }

    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A PLAYER)
    private jump(){
        if (this.canJump){
            this.speed.y=-(Player.GRAVITY*0.7)
            this.canJump=false;
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

    // VIDA
        // public health():void;
        //     if()


    
}