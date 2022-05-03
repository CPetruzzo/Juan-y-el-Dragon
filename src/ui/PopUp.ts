import { Container, Sprite } from "pixi.js";

export class Popup extends Container {

    public static readonly CLOSE_EVENT = "closeMe";

    constructor ()
    {
        super();

        this.addChild(Sprite.from("Window"))

        const spr = Sprite.from("blue_boxCross.png");
        spr.x = 100;
        spr.y = 100;
        spr.on("click",  this.closeMe, this);
        spr.interactive = true;
        this.addChild(spr)
    }
    closeMe() {
        console.log("how do I close this?!");
        this.emit(Popup.CLOSE_EVENT);
    }
}