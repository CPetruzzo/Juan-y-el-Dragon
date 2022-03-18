import { Container, Sprite } from "pixi.js";


// CieloTierra hereda de Container, pero no llamé todavía al constructor padre de Container
export class CieloTierra extends Container{
    constructor(){
        super();
        
        const piso: Sprite = Sprite.from("Suelo");
        const sky: Sprite = Sprite.from("Cielo");
    
        piso.scale.x=1.34
        piso.scale.y=1.34
    
        piso.anchor.set(0);
        sky.anchor.set(0.4);

        this.addChild(sky);
        this.addChild(piso);

    }
}