import { NineSlicePlane, Sprite, Texture } from "pixi.js";
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

        const marco1 = new NineSlicePlane(Texture.from("Marco"),
            35, 35, 35, 35
        );
        marco1.scale.set(0.5, 1);
        this.addChild(marco1);

        this.LowHth = new Sprite(Texture.from("LowHth"));
        this.LowHth.scale.set(0.5,1)
        this.LowHth.position.set(13, 12)
        this.LowHth.visible = false;

        this.MidHth = new Sprite(Texture.from("MidHth"));
        this.MidHth.position.set(13, 12)
        this.MidHth.visible = false;

        this.FullHth = new Sprite(Texture.from("FullHth"));
        this.FullHth.position.set(13, 12)
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
            this.canHurt=true;
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

    // ESTADOS DE VIDA
    public FullHealth(){
        this.FullHth.visible=true;
        this.MidHth.visible=false;
        this.LowHth.visible=false;
    
    }
    public MidHealth () {
        this.FullHth.visible=false;
        this.MidHth.visible=true;
        this.LowHth.visible=false;
    }
    public LowHealth () {
        this.FullHth.visible=false
        this.MidHth.visible=false;
        this.LowHth.visible=true;
    }

}
