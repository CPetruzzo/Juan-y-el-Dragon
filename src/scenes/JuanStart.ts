import { Container,
AnimatedSprite,
Texture,
Graphics} from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../games/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";
// import { Keyboard } from "../utils/Keyboard";

export class JuanInicio extends Container implements IUpdateable{

    private Juan: AnimatedSprite;
    private physJuan: PhysicsContainer;
    private static readonly MOVE_SPEED = 350;
    private juanbox: Graphics;
   
    constructor(){
        super();
    
        this.Juan= new AnimatedSprite([
            Texture.from("Juan1.png"),
            Texture.from("Juan2.png"),
            Texture.from("Juan3.png"),
        ], true,
        ); 
        this.Juan.play();
        this.Juan.animationSpeed=0.1;
        this.Juan.scale.set(0.4);
        // this.Juan.position.set(250,110);
        this.Juan.anchor.set(0.6,1);

        this.physJuan = new PhysicsContainer();
        this.physJuan.speed.x=JuanInicio.MOVE_SPEED;
        // this.physJuan.acceleration.y=1000;
        this.physJuan.position.set(1280,780);
        this.physJuan.scale.x=1;
        this.addChild(this.physJuan);

        this.physJuan.addChild(this.Juan);

        // const auxZero=new Graphics();
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0,0,10);
        // auxZero.endFill;
        // this.physJuan.addChild(auxZero);

        this.juanbox= new Graphics();
        this.juanbox.beginFill(0xFF00FF, 0);
        this.juanbox.drawRect(10,170,90,110);
        this.juanbox.endFill();
        this.juanbox.x=-100
        this.juanbox.y=-280

        this.physJuan.addChild(this.juanbox)

     }

    
    public update(deltaTime: number): void {
        const dt=deltaTime/1000
        this.physJuan.update(dt)
       
            // LIMIT HORIZONTAL
        if (this.physJuan.x>WIDTH-20)
        {
            // limit right
            this.physJuan.x=WIDTH-20;
            this.physJuan.speed.x=JuanInicio.MOVE_SPEED*-0.5;
            this.physJuan.scale.x=1;
        }
            // limit left 
        else if (this.physJuan.x<20)
        {
            this.physJuan.x=20;
            this.physJuan.speed.x=JuanInicio.MOVE_SPEED*0.5;
            this.physJuan.scale.x=-1;
        }

            // LIMIT VERTICAL
        if (this.physJuan.y>HEIGHT)
        {
            // limit down
            this.physJuan.y=HEIGHT;
            this.physJuan.speed.y=Math.abs(this.physJuan.speed.y)*-1;
        }

    }
}