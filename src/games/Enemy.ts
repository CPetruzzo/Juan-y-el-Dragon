import { AnimatedSprite, Graphics, IDestroyOptions, ObservablePoint, Rectangle, Texture } from "pixi.js";
// import { HEIGHT, WIDTH } from "..";
import { Keyboard } from "../utils/Keyboard";
import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class Enemy extends PhysicsContainer implements IHitBox {
   
    private static readonly GRAVITY = 1000;
    // private static readonly MOVE_SPEED = 350;
    public canJump= true;
    public canHeal=true;
    private hitbox: Graphics;

    private DragonWlk: AnimatedSprite;
    static Boss: any;

    constructor()
    {
        super();

        this.DragonWlk = new AnimatedSprite(
            [Texture.from("DrgAtk1"),
            Texture.from("DrgFire1"),
        ],
            true
            );
        this.DragonWlk.play();
        this.DragonWlk.animationSpeed = 0.05;
        this.DragonWlk.position.x =135;
        this.DragonWlk.position.y =-170;
        this.DragonWlk.scale.set(-1, 1);
        this.DragonWlk.visible=true;
        this.addChild(this.DragonWlk);

            // PUNTO GUÍA
            const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,0,10);
            auxZero.endFill();

            // CAJAS
            this.hitbox=new Graphics();
            this.hitbox.beginFill(0xFF00FF, 0);
            this.hitbox.drawRect(-80,-140,190,150);
            this.hitbox.endFill();
            

            // //AGREGANDO
            // this.addChild(this.DragonWlk);
            // this.addChild(auxZero);
            this.addChild(this.hitbox)

            this.acceleration.y= Enemy.GRAVITY;
            Keyboard.down.on("ArrowUp",this.jump,this)

            // // agrego todos los movimientos a la clase Enemy
            this.addChild(
                this.DragonWlk
            )
    }

    // ESTO ES PARA QUE CUANDO DESTRUYA EL Enemy TAMBIÉN SE BORRE EL MÉTODO DE SALTAR KEYBOARD DOWN ARROW UP ----> THIS.JUMP
    public override destroy(options: boolean | IDestroyOptions | undefined){
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump);
    }

    //  MOVIMIENTOS
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
        this.DragonWlk.update(deltaMS/(1000/60)); // esto es para saber cuantos frames pasaron (que deberían ser 1)
    }

    //  FUNCION AUXILIAR (SI NO LA TENGO SEPARADA NO PUEDO BORRARLA CUANDO ELIMINE A Enemy)
    private jump(){
        if (this.canJump){
            this.speed.y=-(Enemy.GRAVITY)
            this.canJump=false;
        }
    }

    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

    //PARA SEPARAR JUGADORES DE SUS PLATAFORMAS
    public separate(overlap: Rectangle, enemy: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x > enemy.x) {
                this.x += overlap.width;
            } else if (this.x < enemy.x) {
                this.x -= overlap.width;
            }
        }
        else {
            if (this.y > enemy.y) {
                this.y -= overlap.height;
                this.speed.y=0;
                this.canJump=true;
            } else if (this.y < enemy.y) {
                this.y += overlap.height;
            }
        }
    }

    public destroyDragon(this:any){
        this.destroy();
    }
}
