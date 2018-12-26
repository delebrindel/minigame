new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        maxPlayerDamage: 10,
        minPlayerDamage: 3,
        maxMonsterDamage: 11,
        minMonsterDamage: 1,
        combatLog: new Array
    },
    methods: {
        startGame: function(){
            this.gameIsRunning=true;
            this.monsterHealth=100;
            this.playerHealth=100;
            this.combatLog
        },
        normalAttack: function (){
            this.monsterHealth-= this.calculateDamage(this.minPlayerDamage, this.maxPlayerDamage);
            if(this.checkWin()){
                return;
            }
            this.playerHealth-= this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
            this.checkWin();
        },
        specialAttack: function (){
            this.monsterHealth-= this.calculateDamage(this.minPlayerDamage, this.maxPlayerDamage)*2;
            if(this.checkWin()){
                return;
            }
            this.playerHealth-=5;
            this.playerHealth-= this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
            this.checkWin();
        },
        selfHeal: function (){
            if(this.playerHealth<=90){
                this.playerHealth+=10;
            }
            else{
                this.playerHealth=100;
            }
            this.playerHealth-= this.calculateDamage(this.minMonsterDamage, this.maxMonsterDamage);
        },
        escape: function (){
            this.gameIsRunning=false;
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