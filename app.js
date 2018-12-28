var player= new spriteAnimator("#player--sprite","assets/sprites/player.png",21,13,64,3,1);
var monster= new spriteAnimator("#monster--sprite","assets/sprites/monster.png",21,13,64,1,1);
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        maxPlayerDamage: 10,
        minPlayerDamage: 3,
        maxMonsterDamage: 13,
        minMonsterDamage: 4,
        combatLog: []
    },
    methods: {
        startGame: function(){
            this.gameIsRunning=true;
            this.monsterHealth=100;
            this.playerHealth=100;
            this.combatLog=[];
            monster.startAnimation('walk_left');
            player.startAnimation('walk_right');
        },
        normalAttack: function (){
            player.startAnimation('ranged_right');
            var damage=this.calculateDamage(this.minPlayerDamage, this.maxPlayerDamage);
            this.monsterHealth-= damage;
            this.logTurn(true, "Player hits monster dealing "+damage+" damage");
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        monsterAttacks: function(){
            monster.startAnimation('thrust_left');
            var damage=this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
            this.playerHealth-=damage; 
            this.logTurn(false, "Monster hits player dealing "+damage+" damage");
            this.checkWin();
        },
        logTurn: function(isPlayer, text){
            this.combatLog.unshift({
                isPlayer: isPlayer,
                text: text
            })
        },
        specialAttack: function (){
            player.startAnimation('ranged_down');
            var damage=this.calculateDamage(this.minPlayerDamage+1, this.maxPlayerDamage+2)*2;
            this.monsterHealth-= damage;
            if(this.checkWin()){
                return;
            }
            this.logTurn(true, "Player uses a special attack on the monster dealing "+damage+" damage");
            this.logTurn(true, "Player is exhausted, receives 5 damage");
            this.playerHealth-= 5;
            this.monsterAttacks();
        },
        selfHeal: function (){
            player.startAnimation('spellcast_right');
            if(this.playerHealth<=90){
                this.playerHealth+=10;
                this.logTurn(true, "Player uses heal, recovering 10 damage");
            }
            else{
                var restored=100-this.playerHealth;
                this.logTurn(true, "Player uses heal, recovering "+restored+" damage")
                this.playerHealth=100;
            }
            this.monsterAttacks();
        },
        escape: function (){
            this.gameIsRunning=false;
            player.startAnimation('fall');
            monster.startAnimation('idle');
        },
        calculateDamage: function(min, max){
            return Math.max(Math.floor(Math.random() * max+1), min); 
        },
        checkWin: function(){
            if(this.playerHealth <= 0){
                if(confirm('You died... Play a new game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                    
                }
                return true;
            }
            else if(this.monsterHealth <= 0){
                if(confirm('You killed the monster! Play a new game?')){
                    this.startGame();
                }
                else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        }
    }
});