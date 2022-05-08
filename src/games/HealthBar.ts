import { Sprite, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";

export class HealthBar extends PhysicsContainer {

    private FullHth: Sprite;
    private LowHth: Sprite;
    private MidHth: Sprite;
    public heal=true;

    constructor() {
        super();

        this.LowHth = new Sprite(Texture.from("LowHth"));
        this.LowHth.position.set(10, 10)
        this.LowHth.visible = true;

        this.MidHth = new Sprite(Texture.from("MidHth"));
        this.MidHth.position.set(10, 10)
        this.MidHth.visible = false;

        this.FullHth = new Sprite(Texture.from("FullHth"));
        this.FullHth.position.set(10, 10)
        this.FullHth.visible = false;

        this.addChild(
            this.LowHth,
            this.MidHth,
            this.FullHth,
        )
    }

    // SI ME TOMO LA POCION
    public healthbar() {
        if (this.heal) {
            this.LowHth.visible = false;
            this.MidHth.visible = false;
            this.FullHth.visible = true;
            this.heal=false;
        }
    }

    // SI ME COMO UNA PIÑA
    public getDamage(){
        if(this.heal) {
            this.LowHth.visible =true;
            this.MidHth.visible =false;
            this.FullHth.visible=false;
        }
    }
}