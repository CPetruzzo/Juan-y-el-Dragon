import { Sprite, Container /*, Graphics*/ } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../games/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";
// import { Keyboard } from "../utils/Keyboard";

export class Dvd extends Container implements IUpdateable{

    private dvd: Sprite;
    private physDvd: PhysicsContainer;
   

    constructor(){
        super();
    
        this.dvd= Sprite.from("dvd.png")
         
      
        this.dvd.scale.set(1);
        this.dvd.position.set(250,110);
        this.dvd.anchor.set(1.5);
        this.physDvd = new PhysicsContainer();
        this.physDvd.speed.x=150;
        this.physDvd.speed.y=75;
        // this.physDvd.acceleration.y=1000;
        this.physDvd.position.set(400,500);
        this.physDvd.scale.x=1;
        this.addChild(this.physDvd);

        this.physDvd.addChild(this.dvd);

        // const auxZero=new Graphics();
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,10);
        // auxZero.endFill;
        // this.physDvd.addChild(auxZero);


     }

    
    public update(deltaTime: number, _deltaFrame: number): void {
        const dt=deltaTime/1000
        this.physDvd.update(dt)
       
            // LIMIT HORIZONTAL
        if (this.physDvd.x>WIDTH)
        {
            // limit right
            this.physDvd.x=WIDTH;
            this.physDvd.speed.x=Math.abs(this.physDvd.speed.x)*-1;
            this.physDvd.scale.x=1;
            this.dvd.tint=0xff00ff;
        }
            // limit left 
        else if (this.physDvd.x<470)
        {
            this.physDvd.x=470;
            this.physDvd.speed.x=Math.abs(this.physDvd.speed.x);
            this.physDvd.scale.x=1;
            this.dvd.tint=0xff0000;
        }

            // LIMIT VERTICAL
        if (this.physDvd.y>HEIGHT)
        {
            // limit down
            this.physDvd.y=HEIGHT;
            this.physDvd.speed.y=Math.abs(this.physDvd.speed.y)*-1;
            this.dvd.tint=0xfff000;
        }
            // limit up
        else if (this.physDvd.y<220)
        {
            this.physDvd.y=220;
            this.physDvd.speed.y=Math.abs(this.physDvd.speed.y);
            this.dvd.tint=0x00ff00;
        }
        console.log(this.physDvd.speed.y);

    }
}