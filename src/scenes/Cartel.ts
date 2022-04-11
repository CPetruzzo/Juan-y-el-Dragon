import { Container, NineSlicePlane, Sprite, Texture} from "pixi.js";

export class Cartel extends Container{
    constructor(){
        super();
        
        const panel = new NineSlicePlane(
            Texture.from("PanelBlue"),
            35,35,35,35
        );
        panel.scale.set(4,2.5);

        /* const musicon: Sprite = Sprite.from("MusicOn"); */
        const config: Sprite = Sprite.from("Config");
        /* const start: Sprite = Sprite.from("Start"); */
        const cross: Sprite = Sprite.from("Cross");
        const save: Sprite= Sprite.from("Save");
        
        
        /* musicon.position.set(150,10); */
        config.position.set(85,10);
        /* start.position.set(145,145); */
        cross.position.set(330,10);
        save.position.set(20,10);
      
        /* musicon.scale.set(0.5); */
        config.scale.set(0.5);
        /* start.scale.set(1); */
        cross.scale.set(0.5);
        save.scale.set(0.5);
            
        this.addChild(panel, config, cross, save);
        /* this.addChild(musicon); */
     
        /* this.addChild(start); */     

        
    }
}