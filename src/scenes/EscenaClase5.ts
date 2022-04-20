import { AnimatedSprite, Container, Texture } from "pixi.js";
import { IUpdateable } from "../utils/IUpdateable";
import { Keyboard } from "../utils/Keyboard";

//antes extendia de container pero desde que cree SceneBase ya no
//el implements es como un contrato, te digo que se mueve, creeme
export class Ataque extends Container implements IUpdateable{

    private AtaqueDeMaxim: AnimatedSprite;
    public speed: number = 500;

    constructor(){
        super();
        
        //Ataque de maxim:
        this.AtaqueDeMaxim=new AnimatedSprite(
            [Texture.from("maxim3.png"),
            Texture.from("maxim4.png"),
            Texture.from("maxim5.png"),
        ], true
        );
        this.AtaqueDeMaxim.play();
        this.AtaqueDeMaxim.animationSpeed=0.1;
        this.AtaqueDeMaxim.scale.set(8);
        this.AtaqueDeMaxim.position.set(300,200);
        this.addChild(this.AtaqueDeMaxim);

       /* ESTO LO SACO PORQUE CREO EL ARCHIVO SCENEBASE.TS
       Ticker.shared.add(this.update,this); 
       */
    }
    //no dice ni public ni nada pero es public, si quiero le pongo
    update(deltaTime: number, deltaFrame: number): void {
        
        deltaFrame=deltaFrame*0.2;

        //Para moverme hacia abajo
        this.AtaqueDeMaxim.update(deltaFrame);
        const dt = deltaTime/1000
        if (Keyboard.state.get("ArrowDown"))
        {
            this.AtaqueDeMaxim.y+=this.speed * dt;
        };
        
        // Para moverme hacia arriba
        this.AtaqueDeMaxim.update(deltaFrame);        
        if (Keyboard.state.get("ArrowUp"))
        {
            this.AtaqueDeMaxim.y-=10;
        };
        
        // Para moverme hacia la izquierda
        this.AtaqueDeMaxim.update(deltaFrame);        
        if (Keyboard.state.get("ArrowLeft"))
        {
            this.AtaqueDeMaxim.x-=10;
        };        
        
        // Para moverme hacia la derecha
        this.AtaqueDeMaxim.update(deltaFrame);        
        if (Keyboard.state.get("ArrowRight"))
        {
            this.AtaqueDeMaxim.x+=10;
        };

    }

    //la ventaja de haber hecho esto es que no tengo que poner ticker.shared en cada escena archivo que haga sino que la reescribo (override) y solo la llamo en index.ts
    //public override update(_deltaTime:number, deltaFrame:number){
    //    this.AtaqueDeMaxim.update(deltaFrame);
    //}
    /* ACLARACIONES
        ESTE PRIVATE ESTABA PERO AHORA VA EN EL ARCHIVO SCENEBASE.TS
        private update(deltaFrame:number){ 
        
        this.AtaqueDeMaxim.update(deltaFrame);        
        if (Keyboard.state.get("KeyA"))
        {
            this.AtaqueDeMaxim.y++;
        };
        
        //deltaFrame="cuantos frames pasaron desde el ultimo frame de tu monitor"
        para hacer que se mueva dentro de la actualización, por ejemplo si estoy quieto y me muevo
        //deltaFrame=deltaFrame*1; //para cambiar la velocidad sin tener que tocar la base o para pausar un juego
        this.AtaqueDeMaxim.y++; para que avance hacia abajo
        // console.log(deltaFrame, Ticker.shared.deltaMS); //deltaMS es lo que más acostumbrados estamos, diferencia de milisegundos sería
        //maquina de lag
        //for(let index=0; index<1500000000; index ++) {
        //1+1;
        }*/
}
