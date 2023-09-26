import { Graphics, ObservablePoint, Rectangle} from "pixi.js";

import { IHitBox } from "./IHitBox";
import { PhysicsContainer } from "./PhysicsContainer";

export class WeaponBox extends PhysicsContainer implements IHitBox {
       
    private swordbox: Graphics;

    constructor()
    {
        super();

            this.swordbox=new Graphics();
            this.swordbox.beginFill(0x00FF00, 0.5);
            this.swordbox.drawRect(0,0,-200,-250);
            this.swordbox.endFill();
            this.swordbox.x=0;
            this.swordbox.y=0;
            this.swordbox.visible=true;
            this.addChild(this.swordbox);

            // PUNTO GUÍA
            const auxZero=new Graphics();
            auxZero.beginFill(0xFF00FF);
            auxZero.drawCircle(0,-40,10);
            auxZero.endFill();
            // this.addChild(auxZero);

            // this.addChild(auxZero);
            this.addChild(this.swordbox);

    }

    //  MOVIMIENTOS
    public override update(deltaMS:number)
    {
        super.update(deltaMS/1000);
    }

    // me da la distancia desde el (0,0) al borde inicial de la hitbox
    public getHitBox(): Rectangle
    {
        return this.swordbox.getBounds(); 
    }

    //PARA ATACAR JUGADORES DE SUS PLATAFORMAS
    public causeDamage(overlap: Rectangle, enemy: ObservablePoint<any>) {
         if (overlap.width < overlap.height) {
            if (this.x < enemy.x) {
                this.x -= overlap.width;
            } else if (this.x > enemy.x) {
                this.x += overlap.width;
            }
        }
        else 
        {
            if (this.y > enemy.y) 
            {
                this.y += overlap.height;
                this.speed.y = 0;
            } else if (this.y < enemy.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
           
            }
        }
    }
}
