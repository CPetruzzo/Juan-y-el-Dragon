import { Container, NineSlicePlane, Sprite, Texture, Text } from "pixi.js";

export class Cartel extends Container{
    constructor(){
        super();
        
        const panel = new NineSlicePlane(
            Texture.from("PanelBlue"),
            35,35,35,35
        );
        panel.scale.set(4,2.5);

        const musicoff: Sprite = Sprite.from("MusicOff");
        const config: Sprite = Sprite.from("Config");
        const start: Sprite = Sprite.from("Start");
        const cross: Sprite = Sprite.from("Cross");
        const save: Sprite= Sprite.from("Save");
        const stage: Text = new Text("pantalla",{fontSize:50,fill:0xF00,fontFamily:"Arial"});
            stage.text = "Stage 1";
        
        musicoff.position.set(150,10);
        config.position.set(85,10);
        start.position.set(145,145);
        cross.position.set(330,10);
        save.position.set(20,10);
        stage.position.set(150,120);

        stage.scale.set(0.6,0.6)
        musicoff.scale.set(0.5);
        config.scale.set(0.5);
        start.scale.set(1);
        cross.scale.set(0.5);
        save.scale.set(0.5);
            
        this.addChild(panel);
        this.addChild(musicoff);
        this.addChild(config);
        this.addChild(start);
        this.addChild(cross);
        this.addChild(save);
        this.addChild(stage);
    }
}