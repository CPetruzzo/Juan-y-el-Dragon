import { Container, NineSlicePlane, Sprite, Texture} from "pixi.js";

export class Cartel extends Container{
    constructor(){
        super();
        
        const panel = new NineSlicePlane(
            Texture.from("PanelBlue"),
            35,35,35,35
        );
        panel.scale.set(4,2.5);

        const config: Sprite = Sprite.from("Config");
        const cross: Sprite = Sprite.from("Cross");
        const save: Sprite= Sprite.from("Save");
        
        config.position.set(85,10);
        cross.position.set(330,10);
        save.position.set(20,10);
      
        config.scale.set(0.5);
        cross.scale.set(0.5);
        save.scale.set(0.5);
            
        this.addChild(panel, config, cross, save);
             
    }
}