var canvas;
var ctx;
var fps = 40;

var altoC = 640;
var anchoC = 400;

var anchoT = 12;
var altoT = 20;

var anchoF = 40;
var altoF = 40;

var pieza;

//dimensiones tablero : 12*17
var tablero = [
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
]
var fichaGrafico=[
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,1,0],
        [0,0,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,1,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,0,0],
        [0,1,1,0],
        [0,1,0,0]
    ],
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,1,0]
    ],[
        [0,0,0,0],
        [1,1,0,0],
        [0,1,1,0],
        [0,0,0,0]
    ],[
        [0,0,0,0],
        [0,0,1,1],
        [0,1,1,0],
        [0,0,0,0]
    ]
]
var colores =[
    ['#2962ff'],
    ['#ff298b'],
    ['#29d6ff'],
    ['#29ff45'],
    ['#ff2929'],
    ['#7329ff'],
    ['#29ccff',]
]



var objPieza = function(){
    this.x =1;
    this.y =7;

    this.tipo = Math.floor(Math.random()*7);
    this.pieza = fichaGrafico[this.tipo];
    this.aux;
    this.velocidad=0;
    
    this.nueva =function(){
        this.tipo = Math.floor(Math.random()*7);
        this.x=4;
        this.y=0;
    }
    this.caer=function(){ 
        if(this.velocidad< 30){
            this.velocidad++
        }else{
            this.y++;
            this.velocidad=0;
        }
    }
    this.dibuja = function(){
        for(var i = 0;i<4;i++){
            for(var j=0;j<4;j++){

                if(this.pieza[i][j]==1) {
                    ctx.fillStyle=colores[this.tipo];
                    ctx.fillRect((this.x+j-1)*anchoF, (this.y+i-4)*altoF,anchoF,altoF);
                }
            }
        }
    }
    this.rotar = function (){
        this.aux=[
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
        var position=3;
        for(var i =0; i<4; i++){
            for(var j =0;j<4;j++){
                this.aux[j][position]= this.pieza[i][j];
                //console.log(this.aux[j][position] + "|||  i: "+ j+ " j: "+ position);
            }
            position--;
        }
        this.pieza =this.aux;
        console.log(this.pieza);
    }
    this.abajo = function(){
        this.y++;
    }
    this.derecha = function(){
        this.x++;

    }
    this.izquierda = function(){
        this.x--;
    }

    this.nueva();

}

function dibujarTablero(){
    for(var i =4 ; i<altoT;i++){
        for(var j = 1; j<anchoT;j++){
            if(tablero[i][j]!=0){
                ctx.fillStyle = colores[tablero[i][j]];
                ctx.fillRect((j-1)*anchoF, (i-4)*altoF,anchoF,altoF); 
            }

        }
    }
}
function inicializaTeclado(){
    document.addEventListener('keydown',(e)=>{
        if(e.keyCode == 37){
            pieza.izquierda();
        }else if(e.keyCode==38){
            pieza.rotar();
        }else if(e.keyCode == 39){
            pieza.derecha();
        }else if(e.keyCode==40){
            pieza.abajo();
        }
    })
}

function inicializa(){
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');

    canvas.style.width = anchoC;
    canvas.style.height = altoC;

    inicializaTeclado();
    setInterval(()=>main(),1000/50)

    pieza = new objPieza();
}
function borrarCanvas(){
    canvas.width = anchoC;
    canvas.height = altoC;
}

function main(){
    borrarCanvas();
    pieza.dibuja();
    pieza.caer();
    dibujarTablero();
}