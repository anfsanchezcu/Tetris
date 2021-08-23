var canvas;
var ctx;
var fps = 40;

var altoC = 640;
var anchoC = 400;

var anchoT = 10;
var altoT = 20;

var anchoF = 40;
var altoF = 40;

var pieza=[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
];

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
    [1,0,0,0,0,0,0,0,2,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,2,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,2,0,0,0,0,0,0,1],
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

    this.tipo = 4;
    this.pieza = fichaGrafico[this.tipo];
    this.aux;
    
    this.dibuja = function(){
        for(var i = 0;i<4;i++){
            for(var j=0;j<4;j++){

                if(this.pieza[i][j]==1) {
                    ctx.fillStyle=colores[this.tipo];
                    ctx.fillRect((this.x+j)*anchoF, (this.y+i)*altoF,anchoF,altoF);
                }
            }
        }
    }
    this.rotar = function (){
        console.log("Se roto la fichha");
    }
    this.abajo = function(){
        console.log("Se bajo la fichha");
    }
    this.derecha = function(){
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
    this.izquierda = function(){
        console.log("Se left la fichha");
    }

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
    dibujarTablero();
}