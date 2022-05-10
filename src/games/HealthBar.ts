import { Sprite, Texture } from "pixi.js";
// import { Cartel } from "../scenes/Cartel";
import { PhysicsContainer } from "./PhysicsContainer";

export class HealthBar extends PhysicsContainer {

    private FullHth: Sprite;
    private LowHth: Sprite;
    private MidHth: Sprite;

    public canHurt=true;
    public canReallyHurt=false;
    public canKill=false;

    constructor() {
        super();

        this.LowHth = new Sprite(Texture.from("LowHth"));
        this.LowHth.scale.set(0.5,1)
        this.LowHth.position.set(10, 10)
        this.LowHth.visible = false;

        this.MidHth = new Sprite(Texture.from("MidHth"));
        this.MidHth.position.set(10, 10)
        this.MidHth.visible = false;

        this.FullHth = new Sprite(Texture.from("FullHth"));
        this.FullHth.position.set(10, 10)
        this.FullHth.visible = true;
        
        this.addChild(
            this.LowHth,
            this.MidHth,
            this.FullHth,
        )
    }

    // SI ME TOMO LA POCION
    public getHealth() {
            this.LowHth.visible = false;
            this.MidHth.visible = false;
            this.FullHth.visible = true;
    }
    

    // SI ME COMO UNA PIÑA
    public getDamage(){
        if (this.canHurt) {
            console.log("me comi una ñapí")
            this.LowHth.visible = false;
            this.MidHth.visible = true;
            this.FullHth.visible = false;
            this.canHurt=false;
            this.canReallyHurt=true;

        }
    }
    
    public getRealDamage(){
        if(this.canReallyHurt) {
            console.log("quede al horno");
            this.LowHth.visible =true;
            this.MidHth.visible =false;
            this.FullHth.visible=false;
            this.canReallyHurt=false;
        }
    }
}
