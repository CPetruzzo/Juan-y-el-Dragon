import { Rectangle } from "pixi.js";

export interface IHitBox {

    getHitBox(): Rectangle;
}

export function checkCollision(objA:IHitBox, objB:IHitBox):Rectangle | null
{
    const rA = objA.getHitBox();
    const rB = objB.getHitBox();

    // PARA LA HORIZONTAL
    const rightmostLeft = rA.left < rB.left ? rB.left : rA.left;
    const leftmostRight = rA.right > rB.right ? rB.right : rA.right;

    // PARA LA VERTICAL
    const bottommostTop = rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = rA.bottom > rB.bottom ? rB.bottom : rA.bottom;

    // makes sense significa que si todo tiene sentido entonces tiene sentido jaja
    const makesSenseHorizontal = rightmostLeft < leftmostRight; 
    const makesSenseVertical = bottommostTop < topmostBottom;

    if (makesSenseHorizontal && makesSenseVertical)
    {
        const retVal = new Rectangle
        retVal.x=rightmostLeft;
        retVal.y=bottommostTop;
        retVal.width = leftmostRight - rightmostLeft;
        retVal.height = topmostBottom - bottommostTop;  
        return retVal;
    }
    else
    {
        return null ;
    }
}
