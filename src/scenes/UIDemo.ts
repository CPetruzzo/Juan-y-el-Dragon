import { Container, InteractionEvent, Sprite, Text, Texture } from "pixi.js";
import { Button } from "../ui/Button";
import { ToggleButton } from "../ui/ToggleButton";
import { Keyboard } from "../utils/Keyboard";
import { Cartel } from "./Cartel";
import { Joystick } from "pixi-virtual-joystick";
import { HEIGHT } from "..";
import { IUpdateable } from "../utils/IUpdateable";


export class UIDemo extends Container implements IUpdateable {

    /* private buttonMouse: Sprite; */
    private buttonMouse: Button;
    private buttonSound: ToggleButton;
    private lastKeyPressed: Text;
    private dragging: boolean = false;
    private draggingMap: boolean = false;
    private cartel: Cartel;
    private map: Sprite;
    private world: Container;
    private joystick: Joystick;

    constructor() {
        super();

        // MAP:
        this.world = new Container();
        this.addChild(this.world);

        this.map = new Sprite(Texture.from("Map1"));
        this.map.scale.set(1);
        this.map.position.set(0, -240);
        this.map.interactive = true;
        this.map.on("pointerdown", this.beginDragMap, this);
        this.map.on("pointerup", this.endDragMap, this);
        this.map.on("pointermove", this.moveDragMap, this);
        this.world.addChild(this.map);

        //  CARTEL:                 AGREGANDO EL CARTEL A LA PANTALLA
        this.cartel = new Cartel();
        this.cartel.position.set(445, 260);
        this.cartel.interactive = true;
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;
        this.cartel.on("pointerdown", this.beginDrag, this);
        this.cartel.on("pointerup", this.endDrag, this);
        this.cartel.on("pointermove", this.moveDrag, this);



        // this.on("movement", (direction) => this.moveMap(direction));

        { /* START:                 ANTES ERA ASÍ (NO ERA UN "THIS")  -------- 
        PERO PARA PODER HACER QUE SEA UN "OBJETO" 
        Y PODER CAMBIARLE LA IMAGEN CUANDO APRIETO Y CUANDO NO
        const buttonMouse = Sprite.from("Start");
        buttonMouse.anchor.set(0.5);
        buttonMouse.x= cartel.width + 235 
        buttonMouse.y = cartel.height + 205
        buttonMouse.on("mousedown", this.onMouseDown, this)
        buttonMouse.on("mouseup", this.onMouseUp, this)
        buttonMouse.interactive=true
        dialog.addChild(buttonMouse);   */
        }

        { /* START:                 COMO QUEDÓ EL BOTON DE START AL FINAL*/
            this.buttonMouse = new Button(Texture.from("Start"),
                Texture.from("StartW"),
                Texture.from("Start"));
            this.buttonMouse.x = this.cartel.width + 235
            this.buttonMouse.y = this.cartel.height + 205
            this.buttonMouse.on("mousedown", this.beginDrag, this);
            this.buttonMouse.on("mouseup", this.endDrag, this);
            this.buttonMouse.on("mousemove", this.moveDrag, this);
            this.buttonMouse.on("buttonClick", this.onButtonClick, this);
            /*this.onButtonClick.bind(this))  le saco el bind y el renglon además voy a Button.ts y le saco todos los callbacks */

            /* TODO ESTO SE VA PORQUE AHORA ESTÁ DENTRO DEL ARCHIVO BUTTON.TS
            this.buttonMouse.anchor.set(0.5); 
            this.buttonMouse.on("mousedown", this.onMouseDown, this)
            this.buttonMouse.on("mouseup", this.onMouseUp, this)
            this.buttonMouse.interactive=true
            this.buttonMouse.on("mouseover",this.onMouseOver, this)
            this.buttonMouse.on("mouseout",this.onMouseOut, this)*/
        }

        { /* TOUCHPAD:              ESTO ES TODO LO QUE TENGO QUE DEFINIR PARA EL TOUCHPAD */
            const buttonTouch = Sprite.from("Start");
            buttonTouch.anchor.set(0.5);
            buttonTouch.x = this.cartel.width + 115
            buttonTouch.y = this.cartel.height + 205
            buttonTouch.on("touchstart", this.onTouchDown, this)
            buttonTouch.on("touchoff", this.onTouchUp, this)
            buttonTouch.interactive = true
        }

        { /* POINTER:               ESTO ES TODO LO QUE TENGO QUE DEFINIR PARA CLICKEAR CON TOUCH O MOUSE */
            const buttonPointer = Sprite.from("Start");
            buttonPointer.anchor.set(0.5);
            buttonPointer.x = this.cartel.width + 355
            buttonPointer.y = this.cartel.height + 205
            buttonPointer.on("pointerdown", this.onPointerDown, this)
            buttonPointer.on("pointerup", this.onPointerUp, this)
            buttonPointer.interactive = true
        }

        { /* MUSIC ON & OFF:        ESTO ES TODO LO QUE TENGO QUE DEFINIR PARA EL MUSIC ON-OFF           
        this.buttonSound = Sprite.from("MusicOn");
        this.buttonSound.anchor.set(0.5);
        this.buttonSound.scale.set(0.5);
        this.buttonSound.x= this.cartel.width + 215
        this.buttonSound.y = this.cartel.height + 45
        this.buttonSound.on("mousedown", this.onSoundDown, this)
        this.buttonSound.interactive=true
        this.buttonSound.buttonMode=true
        this.buttonSound.on("mouseover",this.onSoundOver, this)
        this.buttonSound.on("mouseout",this.onSoundOut, this) */
        }
        this.buttonSound = new ToggleButton(
            Texture.from("MusicOff"),
            Texture.from("MusicOn"));
        this.buttonSound.height = 55;
        this.buttonSound.width = 55;
        this.buttonSound.x = this.cartel.width + 215
        this.buttonSound.y = this.cartel.height + 45
        this.buttonSound.on("buttonClick", this.onButtonClick, this);
        this.buttonSound.on(ToggleButton.TOGGLE_EVENT, (newState) => {
            console.log("toggle changed to:", newState)
        })

        {   //TEXTO
            this.lastKeyPressed = new Text("Stage 1", { fontSize: 40, fontFamily: ("Arial") });
            this.lastKeyPressed.anchor.set(0.5);
            this.lastKeyPressed.x = this.cartel.width + 135
            this.lastKeyPressed.y = this.cartel.height + 85
            dialog.addChild(this.lastKeyPressed);
        }

        {//TECLADO - esto ahora está dentro de Keyboard.ts
            //document.addEventListener("keydown",this.onKeyDown.bind(this));
            //document.addEventListener("keyup",this.onKeyUp.bind(this)) */
        }

        { // ADD.CHILD:             AGREGANDO TODO CON ADDCHILDS
            this.addChild(this.cartel);
            this.addChild(this.buttonSound);
            this.addChild(this.buttonMouse);
            this.addChild(dialog);
            //this.addChild(buttonTouch);  // ESTE ES EL BOTÓN PARA CONTROL CON TOUCH PAD */
            //this.addChild(buttonPointer);  // ESTE ES UN BOTON QUE USA TODO LO DECLARADO EN ESTE CASO TOUCH PAD Y MOUSE */
            Keyboard.down.on("KeyB", this.onKeyB, this); // CON ESTAS DOS FUNCIONES UNO PUEDE APRETAR UN BOTON Y NO
            Keyboard.up.on("KeyB", this.onKeyBUp, this); // APARECE MIL VECES, SINO QUE APRETAS Y HASTA QUE NO SOLTAS NO VUELVE A MARCAR NADA

            this.joystick = new Joystick({
                outer: Sprite.from("outer"), // ("images/joystick.png")
                inner: Sprite.from("inner"), // ("images/joystick-handle.png")

                outerScale: { x: 0.7, y: 0.7 },
                innerScale: { x: 0.8, y: 0.8 },

                onChange: (data) => {
                    console.log(data.angle); // Angle from 0 to 360
                    console.log(data.direction); // 'left', 'top', 'bottom', 'right', 'top_left', 'top_right', 'bottom_left' or 'bottom_right'.
                    console.log(data.power); // Power from 0 to 1
                    const directionMap = {
                        "top": "top",
                        "left": "left",
                        "bottom": "bottom",
                        "right": "right",
                        "top_left": "top_left",
                        "top_right": "top_right",
                        "bottom_left": "bottom_left",
                        "bottom_right": "bottom_right"
                    };

                    if (directionMap[data.direction]) {
                        this.emit("movement", directionMap[data.direction], data.power);
                    }
                },

                onStart: () => {
                    console.log('start')
                },

                onEnd: () => {
                    console.log('end')
                },
            });
            this.joystick.scale.set(1.5);
            this.joystick.position.set(150, HEIGHT - 120);

            this.addChild(this.joystick);

        }
    }
    public update(_deltaFrame: number, deltaTime: number): void {

        this.on("movement", (direction, power) => this.moveMap(direction, power, deltaTime / 10));

    }

    private onKeyB(): void { console.log("apreté la B!", this) }
    private onKeyBUp(): void { console.log("solté la B!", this) }

    /* MOUSE-CLICK-ANTES:           (PARA QUE EL MOUSE HAGA CLICK COMO LO TENÍA ANTES DE CREAR EL "BUTTON.TS" 
    private onMouseDown():void {
        console.log("mouse down");
        this.buttonMouse.texture=Texture.from("StartW");   }
    private onMouseUp():void {
        console.log("Pasaron cosas");
    this.buttonMouse.texture=Texture.from("Start");   } */

    /*EVENTOS QUE ME AVISAN QUE PASA CON EL TECLADO
    //private onKeyDown(event:KeyboardEvent):void {
        console.log("key pressed", event.code);
        this.lastKeyPressed.text=event.code;
        if (event.code =="KeyA"){
            console.log("apretamos la A")
        }
    }
    private onKeyUp(event:KeyboardEvent):void {
        console.log("key released", event.code);
    }*/

    /* PARA QUE EL MOUSE DEL TOUCHPAD HAGA CLICK */
    private onTouchDown(): void { console.log("touch down"); }
    private onTouchUp(): void { console.log("touch up"); }

    /* PARA QUE CUALQUIER COSA HAGA CLICK */
    private onPointerDown(): void { console.log("pointer down"); }
    private onPointerUp(): void { console.log("pointer up"); }

    /* MOUSE-OVER & OUT- ANTES:    PARA QUE SE DE CUENTA QUE LE PASO POR ARRIBA 
    private onMouseOver():void {
        console.log("mouse over");   }
    private onMouseOut():void {
    console.log("mouse out");   } */

    private beginDrag() {
        this.dragging = true;
        console.log(this)
    }

    private moveDrag(e: InteractionEvent) {
        if (this.dragging) {
            const newPos = e.data.getLocalPosition(this.buttonMouse.parent);
            this.buttonMouse.x = newPos.x + 185;
            this.buttonMouse.y = newPos.y + 180;

            const newPos2 = e.data.getLocalPosition(this.lastKeyPressed.parent);
            this.lastKeyPressed.x = newPos2.x + 185;
            this.lastKeyPressed.y = newPos2.y + 100;

            const newPosMsc = e.data.getLocalPosition(this.buttonMouse.parent);
            this.buttonSound.x = newPosMsc.x + 155;
            this.buttonSound.y = newPosMsc.y + 15;

            const newPosParent = e.data.getLocalPosition(this.cartel.parent);
            this.cartel.x = newPosParent.x - 20;
            this.cartel.y = newPosParent.y - 20;
        }
    }

    private endDrag(): void {
        this.dragging = false;
    }


    //drag map

    private beginDragMap() {
        this.draggingMap = true;
        console.log(this)
    }

    private moveDragMap(e: InteractionEvent) {
        if (this.draggingMap) {
            const newPos = e.data.getLocalPosition(this.map.parent);
            // this.map.x = newPos.x +185;
            this.map.y = newPos.y - 500;

            // const newPos2 = e.data.getLocalPosition(this.lastKeyPressed.parent);
            // this.lastKeyPressed.x = newPos2.x +185;
            // this.lastKeyPressed.y = newPos2.y +100;

            // const newPosMsc = e.data.getLocalPosition(this.buttonMouse.parent);
            // this.buttonSound.x = newPosMsc.x +155;
            // this.buttonSound.y = newPosMsc.y +15;

            // const newPosParent = e.data.getLocalPosition(this.cartel.parent);
            // this.cartel.x = newPosParent.x-20;
            // this.cartel.y = newPosParent.y-20;
        }
    }

    private endDragMap(): void {
        this.draggingMap = false;
    }


    /* PARA QUE SE TACHE Y DESTACHE EL SONIDO
    private onSoundDown():void {
        if (this.buttonSound.texture===Texture.from("MusicOn")) {
                console.log("silencio");
            this.buttonSound.texture=Texture.from("MusicOff"); }  
            else  {  
                console.log("sonido de vuelta");
            this.buttonSound.texture=Texture.from("MusicOn"); }
    }*/

    /* PARA QUE SE DE CUENTA QUE LE PASO POR ARRIBA DEL SONIDO 
    private onSoundOver():void { console.log("mouse over the sound icon");   }
    private onSoundOut():void { console.log("mouse out of the sound icon");   }*/

    //BUTTON.TS            HACER FUNCIONAR EL NUEVO BOTÓN  
    private onButtonClick(): void {
        console.log("Apreté start", this);
    }

    private moveMap(direction: string, power: number, deltaTime: number): void {
        switch (direction) {
            case "bottom_left":
                this.world.x -= 0.1 * deltaTime * power;
                this.world.y += 0.1 * deltaTime * power;

                break;

            case "top_right":
                this.world.x += 0.1 * deltaTime * power;
                this.world.y -= 0.1 * deltaTime * power;
                break;

            case "top_left":
                this.world.x -= 0.1 * deltaTime * power;
                this.world.y -= 0.1 * deltaTime * power;
                break;

            case "right":
                this.world.x += 0.1 * deltaTime * power;
                break;

            case "bottom":
                this.world.y += 0.1 * deltaTime * power;
                break;

            case "top":
                this.world.y -= 0.1 * deltaTime * power;
                break;

            case "left":
                this.world.x -= 0.1 * deltaTime * power;
                break;

            case "bottom_right":
                this.world.y += 0.1 * deltaTime * power;
                this.world.x += 0.1 * deltaTime * power;

                break;

            default:
                break;
        }
    }
}

