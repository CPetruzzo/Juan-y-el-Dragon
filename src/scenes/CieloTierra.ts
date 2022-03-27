import { Container, Sprite } from "pixi.js";

export class CieloTierra extends Container{
    constructor(){
        super();
        
        const sky: Sprite = Sprite.from("Cielo");
            sky.anchor.set(0.4);
        
        const piso: Sprite = Sprite.from("Suelo");
            piso.scale.x=1.34
            piso.scale.y=1.34
            piso.anchor.set(0);
            
        this.addChild(sky);
        this.addChild(piso);
    }
}