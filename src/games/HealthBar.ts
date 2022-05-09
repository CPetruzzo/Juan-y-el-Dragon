import { Sprite, Texture } from "pixi.js";
// import { Cartel } from "../scenes/Cartel";
import { PhysicsContainer } from "./PhysicsContainer";

export class HealthBar extends PhysicsContainer {

    private FullHth: Sprite;
    private LowHth: Sprite;
    private MidHth: Sprite;
    // private Dead: Cartel;
    public canHurt=true;
    public canHeal=true;
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

        // this.Dead = new Cartel();
        // this.Dead.interactive=true;
        // this.Dead.visible=false;
        // this.Dead.scale.set(0.5,1)
        // this.Dead.position.set(200,200)
        
        this.addChild(
            this.LowHth,
            this.MidHth,
            this.FullHth,
            // this.Dead,
        )
    }

    // SI ME TOMO LA POCION
    public getHealth() {
        if (this.canHeal) {
            this.LowHth.visible = false;
            this.MidHth.visible = false;
            this.FullHth.visible = true;
        }
        this.canHeal=false;
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
            this.canHeal=true;
        }
    }
    
    public getRealDamage(){
        if(this.canReallyHurt) {
            console.log("quede al horno");
            this.LowHth.visible =true;
            this.MidHth.visible =false;
            this.FullHth.visible=false;
            this.canReallyHurt=false;
            this.canHeal=true;
            this.canKill=true;
        }
    }

    // public getKill(){
    //     if(this.canKill){
    //             console.log("me cagué muriendo");
    //             this.Dead.visible=true;
    //         }
    //     }
    // }
}
