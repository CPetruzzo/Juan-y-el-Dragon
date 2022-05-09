import { Container, Sprite, Text, Texture } from "pixi.js";
import { ChangeScene } from "..";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { IUpdateable } from "../utils/IUpdateable";
import { Cartel } from "./Cartel";
import { Config } from "./Config";
import { JuanInicio } from "./JuanStart";
import { TickerScene } from "./TickerScene";

export class StartMenu extends Container implements IUpdateable{

    /* private buttonMouse: Sprite; */
    private start: Button;
    private configuracion: Button;
    private buttonSound: ToggleButton;
    private lastKeyPressed: Text;
    private cartel: Cartel;
    private juanStart: JuanInicio;

    constructor() {
        super();

        //  CARTEL:                 AGREGANDO EL CARTEL A LA PANTALLA
        this.cartel = new Cartel();
        this.cartel.position.set(455, 260);
        this.cartel.interactive = true;
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;

        // JUAN WALKING BELOW:
        this.juanStart= new JuanInicio();

        { /* START:                 COMO QUEDÓ EL BOTON DE START AL FINAL*/
            this.start = new Button(Texture.from("Start3"),
                Texture.from("Start2"),
                Texture.from("Start1"));
            this.start.x = this.cartel.width + 235
            this.start.y = this.cartel.height + 205
            this.start.scale.x=0.5;
            this.start.scale.y=0.5;
            this.start.on("buttonClick", this.onButtonClick, this);

            // CONFIG
            this.configuracion = new Button(Texture.from("SET1"),
                Texture.from("SET3"),
                Texture.from("SET2"));
            this.configuracion.x = this.cartel.width + 235
            this.configuracion.y = this.cartel.height + 265
            this.configuracion.scale.x=0.5;
            this.configuracion.scale.y=0.5;
            this.configuracion.on("buttonClick", this.onButtonClickConfig, this);

            { /* TOUCHPAD:              ESTO ES TODO LO QUE TENGO QUE DEFINIR PARA EL TOUCHPAD */
                const buttonTouch = Sprite.from("Start1");
                buttonTouch.anchor.set(0.5);
                buttonTouch.x = this.cartel.width + 115
                buttonTouch.y = this.cartel.height + 205
                buttonTouch.on("touchstart", this.onTouchDown, this)
                buttonTouch.on("touchoff", this.onTouchUp, this)
                buttonTouch.interactive = true
            }

            { /* POINTER:               ESTO ES TODO LO QUE TENGO QUE DEFINIR PARA CLICKEAR CON TOUCH O MOUSE */
                const buttonPointer = Sprite.from("Start1");
                buttonPointer.anchor.set(0.5);
                buttonPointer.x = this.cartel.width + 355
                buttonPointer.y = this.cartel.height + 205
                buttonPointer.on("pointerdown", this.onPointerDown, this)
                buttonPointer.on("pointerup", this.onPointerUp, this)
                buttonPointer.interactive = true
            }

            this.buttonSound = new ToggleButton(
                Texture.from("MusicOff"),
                Texture.from("MusicOn"));
            this.buttonSound.height = 55;
            this.buttonSound.width = 55;
            this.buttonSound.x = this.cartel.width + 385
            this.buttonSound.y = this.cartel.height + 85
            this.buttonSound.on("buttonClick", this.onButtonClick, this);
            this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
                console.log("toggle changed to:", newState)
            })

            {   //TEXTO
                this.lastKeyPressed = new Text("STAGE 1", { fontSize: 40, fontFamily: ("Arial") });
                this.lastKeyPressed.anchor.set(0.5);
                this.lastKeyPressed.x = this.cartel.width + 135
                this.lastKeyPressed.y = this.cartel.height + 70
                dialog.addChild(this.lastKeyPressed);
            }

            const bg = Sprite.from("BG");
            this.addChild(bg);


            { // ADD.CHILD:             AGREGANDO TODO CON ADDCHILDS
          
                this.addChild(this.buttonSound);
                this.addChild(this.start);
                this.addChild(this.configuracion);
                this.addChild(dialog);
                //this.addChild(buttonTouch);  // ESTE ES EL BOTÓN PARA CONTROL CON TOUCH PAD */
                //this.addChild(buttonPointer);  // ESTE ES UN BOTON QUE USA TODO LO DECLARADO EN ESTE CASO TOUCH PAD Y MOUSE */

                this.addChild(this.juanStart);
            }
        }
    }

    public update(deltaTime: number, _deltaFrame: number): void {
        this.juanStart.update(deltaTime); //updateAnimation


    
    }
    /* PARA QUE EL MOUSE DEL TOUCHPAD HAGA CLICK */
    private onTouchDown(): void { console.log("touch down"); }
    private onTouchUp(): void { console.log("touch up"); }

    /* PARA QUE CUALQUIER COSA HAGA CLICK */
    private onPointerDown(): void { console.log("pointer down"); }
    private onPointerUp(): void { console.log("pointer up"); }

    //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN  
    private onButtonClick(): void {
        console.log("Apreté start", this);
        ChangeScene(new TickerScene());
    }
    private onButtonClickConfig(): void {
        console.log("Apreté Config", this);
        ChangeScene(new Config());
    }
    
}