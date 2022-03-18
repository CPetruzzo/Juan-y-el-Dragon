import { Container, Sprite } from "pixi.js";

export class Personaje extends Container{
    constructor(){
        super();

        const maxim: Sprite = Sprite.from("Maxim");

        maxim.anchor.set(0);
        maxim.scale.x=1.5;
        maxim.scale.y=1.5;
        maxim.position.set(520,430);

    this.addChild(maxim);
    }
}