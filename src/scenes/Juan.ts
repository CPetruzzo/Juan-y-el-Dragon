import { AnimatedSprite, Container, Texture } from "pixi.js";

export class Warrior extends Container{
    constructor(){
        super();
        
    
        const juan: AnimatedSprite = new AnimatedSprite([
                Texture.from("Juan1.png"),
                Texture.from("Juan2.png"),
                Texture.from("Juan3.png"),
                ], 
                true
                );
                juan.play();
                juan.animationSpeed=0.1;
                juan.scale.set(2);
                juan.position.set(500,100);
        
        this.addChild(juan);
     }
}