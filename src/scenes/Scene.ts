import { Container } from "pixi.js";
import { CieloTierra } from "./CieloTierra";

export class Scene extends Container{

    constructor()
    {
        super();
        
        const CieloyTierra: CieloTierra = new CieloTierra();        

        this.addChild(CieloyTierra); 

    }
    
}