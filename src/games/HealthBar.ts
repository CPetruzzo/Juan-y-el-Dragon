import { Container, Sprite } from "pixi.js";

export class HealthBar extends Container {
    
    public LowHth =false;
    public MidHth =false;
    public FullHth =true;

    constructor()

    {
        super();

        const LowHth:Sprite = Sprite.from("RedHth");
        this.addChild(LowHth);

        const MidHth:Sprite = Sprite.from("YellowHth");
        this.addChild(MidHth);

        const FullHth: Sprite= Sprite.from("GreenHth");
        this.addChild(FullHth);
        
    }

}