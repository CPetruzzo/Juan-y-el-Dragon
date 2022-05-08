import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Platform extends Container implements IHitBox {
    private hitbox: Graphics;
    
    constructor(){
        super();
        
        const spr = Sprite.from("PanelBlue");
        this.addChild(spr);

        this.hitbox=new Graphics();
        this.hitbox.beginFill(0x00FF00, 0.0);
        this.hitbox.drawRect(0,0,100,100);
        this.hitbox.endFill();
        this.hitbox.x=0;
        this.hitbox.y=0;
        this.addChild(this.hitbox);
    }
    
    public getHitBox(): Rectangle
    {
        return this.hitbox.getBounds(); 
    }

}