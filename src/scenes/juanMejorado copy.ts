import { AnimatedSprite, Container, /*Graphics,*/ Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../games/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";
// import { Keyboard } from "../utils/Keyboard";

export class WarriorMoving extends Container implements IUpdateable{

    private juanMov: AnimatedSprite;
    private physJuan: PhysicsContainer;
   

    constructor(){
        super();
    
        this.juanMov= new AnimatedSprite([
                Texture.from("Juan1.png"),
                Texture.from("Juan2.png"),
                Texture.from("Juan3.png"),
                ], 
                true
                );
        this.juanMov.play();
        this.juanMov.scale.set(1);
        this.juanMov.position.set(290,160);
        this.juanMov.animationSpeed=0.05;
        this.juanMov.anchor.set(1.5);
        this.physJuan = new PhysicsContainer();
        this.physJuan.speed.x=200;
        this.physJuan.speed.y=100;
        // this.physJuan.acceleration.y=1000;
        this.physJuan.position.set(300,500);
        this.physJuan.scale.x=-1;
        this.addChild(this.physJuan);

        this.physJuan.addChild(this.juanMov);

        // const auxZero=new Graphics();
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,10);
        // auxZero.endFill;
        // this.physJuan.addChild(auxZero);


     }

    
    public update(deltaTime: number, deltaFrame: number): void {
        this.juanMov.update(deltaFrame);
        const dt=deltaTime/1000
        this.physJuan.update(dt)
       
            // LIMIT HORIZONTAL
        if (this.physJuan.x>WIDTH)
        {
            // limit right
            this.physJuan.x=WIDTH;
            this.physJuan.speed.x=Math.abs(this.physJuan.speed.x)*-1;
            this.physJuan.scale.x=1;
            this.physJuan.position.x=1100;
            this.juanMov.tint=0xff00ff;
        }
            // limit left 
        else if (this.physJuan.x<0)
        {
            this.physJuan.x=150;
            this.physJuan.speed.x=Math.abs(this.physJuan.speed.x);
            this.physJuan.scale.x=-1;
            this.juanMov.tint=0xff0000;
        }

            // LIMIT VERTICAL
        if (this.physJuan.y>HEIGHT)
        {
            // limit down
            this.physJuan.y=HEIGHT;
            this.physJuan.speed.y=Math.abs(this.physJuan.speed.y)*-1;
            this.juanMov.tint=0xfff000;
        }
            // limit up
        else if (this.physJuan.y<260)
        {
            this.physJuan.y=260;
            this.physJuan.speed.y=Math.abs(this.physJuan.speed.y);
            this.juanMov.tint=0x00ff00;
        }
        console.log(this.physJuan.speed.y);

    }
}