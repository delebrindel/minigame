var tID; 
//Variables to avoid typos
const PLAYER_IDLE="pidle";
const PLAYER_HEAL="pheal";
const PLAYER_ATTACK="pattack";
const PLAYER_SATTACK="psattack";
const PLAYER_SURRENDER="psurrender";

function stopAnimate() {
  clearInterval(tID);
} 

function animatePlayer(type) {

  // Which position to start from
  var hPosition = 0; 
  const diff = 64; //diff as a variable for position offset
  const interval = 150; //100 ms of interval for the setInterval()
    if(type==PLAYER_IDLE){
        var vPosition = 704; 
        var hLimit=512;
    }
    else if(type==PLAYER_HEAL){
        var vPosition = 192; 
        var hLimit=384;
    }
    else if(type==PLAYER_ATTACK){
        var vPosition = 1216; 
        var hLimit=896;
    }
    else if(type==PLAYER_SATTACK){
        var vPosition = 1152; 
        var hLimit=896;
    }
    else if(type==PLAYER_SURRENDER){
        var vPosition = 1280; 
        var hLimit=320;
    }
  tID = setInterval(() => {
  
    document.getElementById("player--sprite").style.backgroundPosition =`-${hPosition}px -${vPosition}px`;
    //we use the ES6 template literal to insert the variable "position"
    
    if (hPosition < hLimit) {
      hPosition = hPosition + diff;
    }
    //we increment the position by 256 each time
    else {
      if(type==PLAYER_SURRENDER){
        stopAnimate();
      }
      else{
        hPosition = 64;
      }
    }
    //reset the position to 256px, once position exceeds 1536px
    
  }, interval); //end of setInterval
} //end of animateScript()

function giveUp(){
  var vPosition = 1344; 
  var hPosition= 320;

}
