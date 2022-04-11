//import { Container } from "pixi.js";
//export class SceneBase extends Container
// en teoría esto es más prolijo y más útil, la idea es que sirva para todas las escenas.


export interface IUpdateable

{
  update(_deltaTime:number, deltaFrame?:number):void;//{}
}