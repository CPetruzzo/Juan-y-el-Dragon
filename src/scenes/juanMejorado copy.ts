import { AnimatedSprite, Container, Graphics, Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "..";
import { PhysicsContainer } from "../games/PhysicsContainer";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";

export class WarriorMoving extends Container implements IUpdateable{

    private juanMov: AnimatedSprite;
    private physJuan: PhysicsContainer;
    public speed: number = 200;
    
    constructor(){
        super();
    
        this.juanMov= new AnimatedSprite([
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
        this.physJuan = new PhysicsContainer();
        // this.physJuan.speed.x=200;
        // this.physJuan.speed.y=100;
        this.physJuan.acceleration.y=1000;
        this.physJuan.position.set(300,500);
        this.physJuan.scale.x=-1;
        this.addChild(this.physJuan);

        this.physJuan.addChild(this.juanMov);

        const auxZero=new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0,0,10);
        auxZero.endFill;
        this.physJuan.addChild(auxZero);

     }
    
    public update(deltaTime: number, deltaFrame: number): void {
        this.juanMov.update(deltaFrame);
        const dt=deltaTime/1000
        this.physJuan.update(dt)

/////////////////////////////////////////////////////////////////////////// 

        // CAMINAR HACIA ABAJO 
        if (Keyboard.state.get("ArrowDown")){
            this.juanMov.play();
            this.physJuan.y+=this.speed * dt;
        }

        // CAMINAR HACIA ARRIBA 
        if (Keyboard.state.get("ArrowUp")){
            this.juanMov.play();
            this.physJuan.y-=this.speed * dt;
        }
        
        // CAMINAR HACIA LA IZQUIERDA
        
        if (Keyboard.state.get("ArrowLeft")){
            this.juanMov.play();
            this.physJuan.x-=this.speed * dt;
            this.physJuan.scale.x=1;
            this.juanMov.position.set(200,160);
        }
        
        // CAMINAR HACIA LA DERECHA
        if (Keyboard.state.get("ArrowRight")){
            this.juanMov.play();
            this.physJuan.x+=this.speed * dt;
            this.physJuan.scale.x=-1;
        }
        // CORRER HACIA LA DERECHA
        if (Keyboard.state.get("ArrowRight" && "KeyD")){
            this.juanMov.play();
            this.physJuan.x+=this.speed * 2* dt;
            this.physJuan.scale.x=-1;
        }
        // CORRER HACIA LA IZQUIERDA
        if (Keyboard.state.get("ArrowLeft" && "KeyA")){
            this.juanMov.play();
            this.physJuan.x-=this.speed * 2* dt;                    
            this.physJuan.scale.x=1;
        }
        // FLOTAR
        if (Keyboard.state.get("KeyF")) {
            if (this.physJuan.position.y=HEIGHT-100){
            this.juanMov.play();
            this.physJuan.acceleration.y=0;}
        };

        // NO FLOTAR
        if (Keyboard.state.get("KeyG")) {
            if (this.physJuan.position.y!=HEIGHT-100){
            this.juanMov.play();
            this.physJuan.acceleration.y=1000;
        }
        };
        
        // SALTAR
        if (Keyboard.state.get("Space")) {
            if (this.physJuan.position.y==(HEIGHT-100)){
            this.juanMov.play();
            this.physJuan.speed.y-=this.physJuan.speed.y+500;
        } else if (onkeyup) {
            this.juanMov.stop()}
        };
        
        
        if (Keyboard.state.get("None"))
        this.juanMov.stop();

// LIMIT HORIZONTAL
        if (this.physJuan.x>WIDTH-100){
            
            // LIMITE DERECHO
            this.physJuan.x=WIDTH;
            this.physJuan.speed.x=Math.abs(this.physJuan.speed.x);
            this.physJuan.scale.x=-1;
            this.physJuan.position.x=WIDTH-100;
            this.juanMov.tint=0xff00ff;
        }

            // LIMITE IZQUIERDO 
        else if (this.physJuan.x<100)
        {
            this.physJuan.x=100;
            this.physJuan.speed.x=Math.abs(this.physJuan.speed.x);
            this.physJuan.scale.x=1;
            this.juanMov.tint=0xff0000;
        }
        if (this.physJuan.speed.x=0) {
            this.juanMov = new AnimatedSprite([
                Texture.from("Juan1.png")
            ],
            false
            );

            this.juanMov.scale.set(1);
            this.juanMov.position.set(200,160);
            this.juanMov.animationSpeed=0.05;
            this.juanMov.anchor.set(1.5);
   
        }
///////////////////////////////////////////////////////////////////////////

// LIMIT VERTICAL
        if (this.physJuan.y>HEIGHT-100)
        {
            // LIMITE INFERIOR
            
            this.physJuan.y=HEIGHT-100;
            this.physJuan.speed.y=Math.abs(this.physJuan.speed.y)*0;
            this.juanMov.tint=0xffffff;
        }
            // LIMITE SUPERIOR
        else if (this.physJuan.y<260)
        {
            this.physJuan.y=260;
            this.physJuan.speed.y=Math.abs(this.physJuan.speed.y);
            this.juanMov.tint=0x00ff00;
        }
        

    }
}