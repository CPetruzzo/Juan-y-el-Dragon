import { Container, Sprite } from "pixi.js";

export class Personaje extends Container{
    constructor(){
        super();
        
        const maxim: Sprite = Sprite.from("Maxim");
        this.addChild(maxim);
    }
}