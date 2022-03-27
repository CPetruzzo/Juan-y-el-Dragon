import { Container, Sprite, Texture } from "pixi.js";
import { Cartel } from "./Cartel";

export class UIDemo extends Container{
    
    private buttonMouse: Sprite;
    private buttonSound: Sprite;
    constructor(){
        super();
            
        const cartel: Cartel = new Cartel ();
        cartel.position.set(440,260)

        /*      ANTES ERA ASÍ   -------- 
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

        this.buttonMouse = Sprite.from("Start");
        this.buttonMouse.anchor.set(0.5);
        this.buttonMouse.x= cartel.width + 235 
        this.buttonMouse.y = cartel.height + 205
        this.buttonMouse.on("mousedown", this.onMouseDown, this)
        this.buttonMouse.on("mouseup", this.onMouseUp, this)
        this.buttonMouse.interactive=true
        this.buttonMouse.on("mouseover",this.onMouseOver, this)
        this.buttonMouse.on("mouseout",this.onMouseOut, this)
        
        const buttonTouch = Sprite.from("Start");
        buttonTouch.anchor.set(0.5);
        buttonTouch.x= cartel.width + 115 
        buttonTouch.y = cartel.height + 205
        buttonTouch.on("touchstart", this.onTouchDown, this)
        buttonTouch.on("touchoff", this.onTouchUp, this)
        buttonTouch.interactive=true
       
        const buttonPointer = Sprite.from("Start");
        buttonPointer.anchor.set(0.5);
        buttonPointer.x= cartel.width + 355
        buttonPointer.y = cartel.height + 205
        buttonPointer.on("pointerdown", this.onPointerDown, this)
        buttonPointer.on("pointerup", this.onPointerUp, this)
        buttonPointer.interactive=true
     
        this.buttonSound = Sprite.from("MusicOn");
        this.buttonSound.anchor.set(0.5);
        this.buttonSound.scale.set(0.5);
        this.buttonSound.x= cartel.width + 215
        this.buttonSound.y = cartel.height + 45
        this.buttonSound.on("mousedown", this.onSoundDown, this)
        this.buttonSound.interactive=true
        this.buttonSound.on("mouseover",this.onSoundOver, this)
        this.buttonSound.on("mouseout",this.onSoundOut, this)

        this.addChild(cartel); 
        this.addChild(this.buttonSound);
        this.addChild(this.buttonMouse);
        /* this.addChild(buttonTouch); */ /*ESTE ES EL BOTÓN PARA CONTROL CON TOUCH PAD */
        /* this.addChild(buttonPointer); */ /* ESTE ES UN BOTON QUE USA TODO LO DECLARADO EN ESTE CASO TOUCH PAD Y MOUSE */
    } 



    /* PARA QUE EL MOUSE HAGA CLICK */
    private onMouseDown():void {
        console.log("mouse down");
        this.buttonMouse.texture=Texture.from("StartW");   }
    private onMouseUp():void {
        console.log("Pasaron cosas");
        this.buttonMouse.texture=Texture.from("Start");   }

    /* PARA QUE EL MOUSE DEL TOUCHPAD HAGA CLICK */
    private onTouchDown():void {
        console.log("touch down");   }
    private onTouchUp():void {
        console.log("touch up");   }

    /* PARA QUE CUALQUIER COSA HAGA CLICK */
    private onPointerDown():void {
        console.log("pointer down");   }
    private onPointerUp():void {
        console.log("pointer up");   }

    /* PARA QUE SE DE CUENTA QUE LE PASO POR ARRIBA */
    private onMouseOver():void {
        console.log("mouse over");   }
    private onMouseOut():void {
        console.log("mouse out");   }

    /* ---------------------------------------------------------------------------------------*/

    /* PARA QUE SE TACHE Y DESTACHE EL SONIDO */
    private onSoundDown():void {
        if (this.buttonSound.texture===Texture.from("MusicOn")) {
                console.log("silencio");
            this.buttonSound.texture=Texture.from("MusicOff"); }  
            else  {  
                console.log("sonido de vuelta");
            this.buttonSound.texture=Texture.from("MusicOn"); }
    }
    /* PARA QUE SE DE CUENTA QUE LE PASO POR ARRIBA DEL SONIDO */
    private onSoundOver():void {
        console.log("mouse over the sound icon");   }
    private onSoundOut():void {
        console.log("mouse out of the sound icon");   }
}