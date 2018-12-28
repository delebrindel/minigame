const IDLE="idle";
const WALK_LEFT="walk_left";
const WALK_RIGHT="walk_right";
const WALK_UP="walk_up";
const WALK_DOWN="walk_down";
const SPELLCAST_LEFT="spellcast_left";
const SPELLCAST_RIGHT="spellcast_right";
const MELEE_ATTACK_LEFT="melee_left";
const MELEE_ATTACK_RIGHT="melee_right";
const RANGED_ATTACK_RIGHT="ranged_right";
const RANGED_ATTACK_LEFT="ranged_left";
const RANGED_ATTACK_UP="ranged_up";
const RANGED_ATTACK_DOWN="ranged_down";
const FALL_DOWN="fall";

class spriteAnimator{
    constructor(element,src,rows,cols,squareSize,startRow=0,startCol=0){
        this.src=src;
        this.rows=rows;
        this.cols=cols;
        this.size=squareSize;
        this.element=element; 
        this.LastInterval;
        document.querySelector(element).style.background =`url('${src}') -${startCol*this.size}px -${startRow*this.size}px`;
        this.running=false;
    };
    stopAnimate(tID) {
        clearInterval(tID);
    };      
    // Animation starter
    changeFrame(hPosition,vPosition){
        if(vPosition>this.rows || hPosition>this.cols){
            console.log("Error, out of bounds");
        }
        else{
            //ES6 Literal to choose what cell we're using as background
            document.querySelector(this.element).style.backgroundPosition =`-${hPosition*this.size}px -${vPosition*this.size}px`;
        }
    };
    startAnimation(type,interval=150,repeat=true){
        var hPosition = 0; 
        var self=this;
        var vPosition=2;
        var hLimit=0;
        switch(type){
            case WALK_UP:
                vPosition = 8; 
                hLimit=8;
                break;
            case WALK_LEFT:
                vPosition = 9; 
                hLimit=8;
                break;
            case WALK_DOWN:
                vPosition = 10; 
                hLimit=8;
                break;
            case WALK_RIGHT:
                vPosition = 11; 
                hLimit=8;
                break;
            case RANGED_ATTACK_UP:
                vPosition = 16; 
                hLimit=13;
                break;
            case RANGED_ATTACK_LEFT:
                vPosition = 17; 
                hLimit=13;
                break;
            case RANGED_ATTACK_DOWN:
                vPosition = 18; 
                hLimit=13;
                break;
            case RANGED_ATTACK_RIGHT:
                vPosition = 19; 
                hLimit=13;
                break;
            case MELEE_ATTACK_LEFT:
                vPosition = 5; 
                hLimit=7;
                break;
            case MELEE_ATTACK_RIGHT:
                vPosition = 7; 
                hLimit=7;
                break;
            case SPELLCAST_LEFT:
                vPosition = 1; 
                hLimit=6;
                break;
            case SPELLCAST_RIGHT:
                vPosition = 3; 
                hLimit=6;
                break;
            case FALL_DOWN:
                vPosition = 20; 
                hLimit=5;
                break;
        }
        if(this.LastInterval){
            this.stopAnimate(this.LastInterval);
        }
        this.LastInterval=setInterval(()=>{
            self.changeFrame(hPosition,vPosition);   
            if (hPosition < hLimit) {
                hPosition++;
            }
            else{
                if(repeat==false||type==FALL_DOWN){
                    stopAnimate();
                }
                else{
                    hPosition = 0;
                }
            }
        },interval);
    }
}